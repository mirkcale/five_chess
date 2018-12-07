/**
 * Created by lyy on 2017/12/20.
 */
import { Button } from "antd";
import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

interface IMapState {
  canUndo: boolean;
  canRedo: boolean;
}

interface IMapDispatch {
  onUndo: () => void;
  onRedo: () => void;
}
type IUndoRedoProps = IMapState & IMapDispatch;

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }: IUndoRedoProps) => (
  <p>
    <Button onClick={onUndo} disabled={!canUndo}>
      悔棋
    </Button>
    <Button onClick={onRedo} disabled={!canRedo}>
      撤销
    </Button>
  </p>
)

const mapStateToProps = (state: any) => ({
  canRedo: state.chess.future.length > 0,
  canUndo: state.chess.past.length > 0,
})

const mapDispatchToProps = ({
  onRedo: UndoActionCreators.redo,
  onUndo: UndoActionCreators.undo,
})

export default connect<IMapState, IMapDispatch>(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)