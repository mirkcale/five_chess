import { Player } from "../actions/switchPlayer";

/**
 * Created by lyy on 2017/12/19.
 */
export default (state = Player.WHITE, action: { type: string, play: Player }) => {
  switch (action.type) {
    case 'SWITCH_PLAYER':
      return action.play === Player.WHITE ? Player.BLACK : Player.WHITE
    default:
      return state
  }
}