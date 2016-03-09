'use strict';
import axn from 'axn';
import axns from './create-actions';

export var createAction = axn;
export var createActions = axns;
export var createAsyncAction = axn.async;
export var createAsyncActions = axns.async;

export {createStore, factory as storeFactory} from './create-raw-store';
export {createRawStore, factory as rawStoreFactory} from './create-raw-store';
export {createCursorStore factory as cursorStoreFactory} from './create-cursor-store';
export {createImmutableStore, factory as immutableStoreFactory} from './create-immutable-store';
export {createCollection, factory as collectionFactory} from './create-collection';

export function createApi(actionCreator = axn, immuter) {
  return {
    createAction: actionCreator;
    createActions: axns;
    createAsyncAction: actionCreator.async;
    createAsyncActions: axns.async;

    createStore: storeFactory(actionCreator),
    createRawStore: rawStoreFactory(actionCreator),
    createImmutableStore: immutableStoreFactory(actionCreator, immuter),
    createCollection: collectionFactory(actionCreator),
    createCursorStore: cursorStoreFactory(actionCreator)
  };
}