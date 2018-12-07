/**
 * Created by lyy on 2017/12/19.
 */
import { SWITCH_PLAYER } from './actionTypes'
export enum Player {
  WHITE = 'white',
  BLACK = 'black',
};

export default function switchPlayer(play: Player) {
  return {
    play,
    type: SWITCH_PLAYER,
  }
}