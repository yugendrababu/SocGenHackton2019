import { call } from 'redux-saga/effects';

import { expect } from 'chai';
import sagaHelper from 'redux-saga-testing';

import { getApplicationName } from '../img-app-sagas';
import { applicationName } from '../img-app-resource';

describe('app saga', () => {
  describe('applicationName', () => {
    const it = sagaHelper(getApplicationName());

    it('should handle get application name ', (result) => {
      expect(result).to.deep.equal(call(applicationName));
    });
  });
});
