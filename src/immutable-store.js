'use strict';
import immutable from 'immutable';
import createRawStore from './create-raw-store';

// default create using axn and immutable
export function create(
  emptyValue = null,
  prepare = v => v
) {
  return factory()(emptyValue, prepare);
};

// build custom create using action factory
export function factory(actionCreator = axn, immuter = {stateManager: immutable) {
  return function(
      emptyValue = null,
      prepare = v => v
  ) {
    return createRawStore.factory(actionCreator)(
      emptyValue,
      v => immuter.stateManager.fromJS(prepare(v)),
      immuter.stateManager.is
    );
  }
}
