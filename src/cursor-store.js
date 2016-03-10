'use strict';
import immutable from 'immutable';
import Cursor from 'immutable/contrib/cursor';
import axn from 'axn';

// default create using axn, immutable and Cursor
export function create(emptyValue, prepare) {
  return factory()(emptyValue, prepare);
}

export function factory(actionFactory = axn, immuter = {stateManager: immutable, cursor: Cursor}) {
  return function(emptyValue, prepare) {
    const action = actionFactory();
    const emptyAction = actionFactory();
    let state = (function (value) {
      function cursor(data) {
        return immuter.cursor.from(data, function (rawData) {
          const newData = (
            rawData === null
            ? emptyValue
            : immuter.stateManager.fromJS(prepare ? prepare(rawData) : rawData)
          );
          state = cursor(newData);
          action(state);
          emptyAction(immutable.is(state, emptyValue));
          return newData;
        });
      }
      return cursor(value);
    }(emptyValue || immuter.Map()));
    function store(data) {
      if (data !== undefined) {
        state.update(() => data);
      }
      return state;
    }
    store.isFynxStore = true;
    store.listen = ::action.listen;
    store.listenOnce = ::action.listenOnce;
    store.unlisten = ::action.unlisten;
    store.isEmpty = () => immuter.is(state, emptyValue);
    store.isEmpty.listen = ::emptyAction.listen;
    store.isEmpty.listenOnce = ::emptyAction.listenOnce;
    store.isEmpty.unlisten = ::emptyAction.unlisten;
    store.toJSON = () => state && state.toJSON ? state.toJSON() : state;
    store.fromJSON = data => {
      store(data);
    };
    return store;
  }
}