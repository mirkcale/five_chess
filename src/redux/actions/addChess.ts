/**
 * Created by lyy on 2017/12/18.
 */
import { Position } from '../../components/chessbord'
import { Player } from '../actions/switchPlayer'

import { ADD_CHESS } from './actionTypes'
export default function addChess(position: Position, player: Player) {
  return {
    payload: {
      player,
      position,
    },
    type: ADD_CHESS,

  }
}
