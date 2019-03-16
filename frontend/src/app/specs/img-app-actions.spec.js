import { expect } from 'chai';

import * as appActions from '../img-app-actions';
import constants from '../img-app-constants';

describe('app actions', () => {
  describe('Actions', () => {
    it('should fetch applicationName ', () => {
      const action = appActions.getApplicationName();

      expect(action.type).to.equal(constants.GET_APPLICATION_NAME_ACTION);
    });
    it('should fetch Transaction List ', () => {
      const action = appActions.getTransactionList();

      expect(action.type).to.equal(constants.GET_TRANSACTION_LIST_ACTION);
    });
    it('should set click on top level component ', () => {
      const action = appActions.setClickOnTopLevelComponent();

      expect(action.type).to.equal(constants.CLICK_ON_TOP_LEVEL_COMPONENT);
    });
  });
});
