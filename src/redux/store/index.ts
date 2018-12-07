/**
 * Created by lyy on 2017/12/19.
 */
// import _ from 'lodash';
import { AnyAction, createStore, Store } from 'redux';
import { StateWithHistory } from 'redux-undo';
import { Player } from '../actions/switchPlayer';
import reducer from '../reducers';

export interface InitialStore {
    container: {
        [Player.BLACK]: Array<[number, number]>;
        [Player.WHITE]: Array<[number, number]>;
    },
    player: Player
}
const initialStore: InitialStore = {
    container: {
        [Player.BLACK]: [],
        [Player.WHITE]: []
    },
    player: Player.WHITE
}
const state: StateWithHistory<InitialStore> = {
    _latestUnfiltered: initialStore,
    future: [],
    group: {},
    index: 0,
    limit: 10,
    past: [],
    present: initialStore,
}

const store: Store<{
    chess: StateWithHistory<InitialStore>;
}, AnyAction> = createStore(reducer, { chess: state });

export default store