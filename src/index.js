'use strict';
import axn from 'axn';
import actions from './actions';

export var createAxn = axn;
export var createAsyncAxn = axn.async;

export var createActions = actions.create;
export var createAsyncActions = actions.createAsync;

// singular aliases
export var createAction = createActions;
export var createAsyncAction = createAsyncActions;

export store from './raw-store';
export rawStore from './raw-store';
export cursorStore from './cursor-store';
export immutableStore from './immutable-store';
export collection from './collection';

export function createApi(factories = {default: axn}) {
  return {
    createAction: actions.create;
    createActions: actions.create;
    createAsyncAction: actions.createAsync
    createAsyncActions: actions.createAsync;

    createStore: store.factory(factories.store || factories.default),
    createRawStore: rawStore.factory(factories.rawStore || factories.default),
    createImmutableStore: immutableStore.factory(factories.immutableStore || factories.default, factories.immuter),
    createCollection: collection.factory(factories.collection || factories.default),
    createCursorStore: cursorStore.factory(factories.cursorStore || factories.default)
  };
}