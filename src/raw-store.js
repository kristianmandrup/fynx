'use strict';
import axn from 'axn';

// default create using axn
export function create(
    emptyValue = null,
    prepare = v => v,
    isEmpty = Object.is
  ) {
  return factory()(
    emptyValue,
    prepare,
    isEmpty
  );
}

// build custom create using action factory
export function factory(actionFactory = axn) {
  return function create(
    emptyValue = null,
    prepare = v => v,
    isEmpty = Object.is
  ) {
    const action = actionFactory();
    const emptyAction = actionFactory();
    let state = emptyValue;

    function store(value) {
      if (value !== undefined) {
        state = value === null ? emptyValue : prepare(value);
        action(state);
        emptyAction(store.isEmpty());
      }
      return state;
    }

    store.isFynxStore = true;
    store.listen = ::action.listen;
    store.listenOnce = ::action.listenOnce;
    store.unlisten = ::action.unlisten;
    store.isEmpty = () => isEmpty(state, emptyValue);
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

