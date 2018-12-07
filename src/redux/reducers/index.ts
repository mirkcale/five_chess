import { combineReducers } from 'redux'
import undoable from 'redux-undo';
import addChess from './addChess'

const chessApp = combineReducers({
  chess: undoable(addChess)
})

export default chessApp