import { expect } from 'chai';
import dataSourceReducer from '../img-app-reducers';

describe('dataSource reducer', () => {
  it('should return the initial state', () => {
    const initialState = {};
    const action = {};

    expect(dataSourceReducer(initialState, action)).to.deep.equal({});
  });
});
