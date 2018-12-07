/**
 * Created by lyy on 2017/12/18.
 */
// import initialStore from '../store'

import { Position } from '../../components/chessbord'
import { Player } from '../actions/switchPlayer'
import { InitialStore } from '../store'
interface IAction<T> {
  type: string;
  payload: T;
}

const initialStore: InitialStore = {
  container: {
    [Player.BLACK]: [],
    [Player.WHITE]: []
  },
  player: Player.WHITE
}

const addChess = (state = initialStore, action: IAction<{ player: Player; position: Position }>) => {
  switch (action.type) {
    case 'ADD_CHESS':
      return {
        container: { ...state.container, ...{ [action.payload.player]: [...state.container[action.payload.player].concat([action.payload.position])] } },
        player: action.payload.player === Player.WHITE ? Player.BLACK : Player.WHITE,
      }
    default:
      return state
  }
}

export default addChess