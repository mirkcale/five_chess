/**
 * Created by lyy on 2017/12/19.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StateWithHistory } from 'redux-undo';
import UndoRedo from '../container/UndoRedo'
import addChessCreator from '../redux/actions/addChess'
import { Player } from '../redux/actions/switchPlayer'
import { InitialStore } from '../redux/store'

export type Position = [number, number];

interface IChessBordProps {
  chess: StateWithHistory<InitialStore>;
}

class Chessboard extends Component<InitialStore & IConnectDispatch & {}> { // reduxStore, reduxDispatch, ownerProps
  constructor(props: InitialStore & IConnectDispatch) {
    super(props);
    this.drawChessBoard = this.drawChessBoard.bind(this)
    this.oneStep = this.oneStep.bind(this)
  }

  public componentDidMount() {
    this.drawChessBoard()
  }

  public hasChess(position: Position) {

    const { black, white } = this.props.container

    return this.unique(position, black) || this.unique(position, white)
  }

  public drawChessBoard() {
    const chess = document.getElementById("chessboard") as HTMLCanvasElement;
    const context = chess.getContext('2d') as CanvasRenderingContext2D;
    const width = chess.width
    const height = chess.height

    context.clearRect(0, 0, width, height)
    context.strokeStyle = '#bfbfbf'; // 边框颜色
    for (let i = 0; i < 15; i++) {
      context.moveTo(15 + i * 30, 15);
      context.lineTo(15 + i * 30, 435);
      context.stroke();
      context.moveTo(15, 15 + i * 30);
      context.lineTo(435, 15 + i * 30);
      context.stroke();
    }
  }

  public oneStep(e: React.MouseEvent<HTMLCanvasElement>) {
    const x = Math.floor(e.nativeEvent.offsetX / 30);
    const y = Math.floor(e.nativeEvent.offsetY / 30);
    const player: Player = this.props.player
    if (this.hasChess([x, y])) {
      return
    }
    this.props.addChess([x, y], player)
    return
  }

  public drawChess(x: number, y: number, player: Player) {
    const chess = document.getElementById("chessboard") as HTMLCanvasElement;
    const context = chess.getContext('2d') as CanvasRenderingContext2D;
    context.beginPath();
    context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);// 画圆
    context.closePath();
    // 渐变
    const gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
    if (player === Player.BLACK) {
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#636766');
    } else {
      gradient.addColorStop(0, '#d1d1d1');
      gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
    context.beginPath();
  }

  public componentWillReceiveProps(nextProps: InitialStore & IConnectDispatch) {
    const { black, white } = nextProps.container;
    this.drawChessBoard()
    black.map((i: Position) => this.drawChess(i[0], i[1], Player.BLACK))
    white.map((i: Position) => this.drawChess(i[0], i[1], Player.WHITE))
  }


  public render() {
    return (
      <div>
        <canvas
          id="chessboard"
          width="450"
          height="450"
          style={{
            boxShadow: '-2px -2px 2px #efefef, 5px 5px 5px #b9b9b9',
            display: 'block',
            margin: '50px auto',
          }}
          onClick={this.oneStep}
        />
        <UndoRedo />
      </div>
    )
  }
  private unique(positionArray: Position, array: Position[]) {
    const length = array && array.length
    let hasChessFlag = false
    if (length === 0) {
      return hasChessFlag
    }
    const [x, y] = positionArray
    for (let i = 0; i < length; i++) {
      if (x === array[i][0] && y === array[i][1]) {
        hasChessFlag = true
        break
      }
    }
    return hasChessFlag
  }
}
interface IConnectDispatch {
  addChess: typeof addChessCreator
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    addChess: addChessCreator,
  }, dispatch)
};

const mapStateToProps = (state: IChessBordProps) => {
  return {
    container: state.chess.present.container,
    player: state.chess.present.player
  }
};

export default connect<InitialStore, IConnectDispatch>(mapStateToProps, mapDispatchToProps)(Chessboard)