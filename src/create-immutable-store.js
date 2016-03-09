'use strict';
import immutable from 'immutable';
import createRawStore from './create-raw-store';

immutable.isEmpty = immutable.is;

export default function createImmutableStore(
  emptyValue = null,
  prepare = v => v
) {
  return factory()(emptyValue, prepare);
};

export function factory(actionCreator = axn, immuter = immutable) {
  return function(
      emptyValue = null,
      prepare = v => v
  ) {
    return createRawStore.factory(actionCreator)(
      emptyValue,
      v => immutable.fromJS(prepare(v)),
      immutable.isEmpty
    );
  }
}
