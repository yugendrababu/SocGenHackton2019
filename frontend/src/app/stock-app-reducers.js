import constants from './stock-app-constants';

const initialState = {
  transactionList: [],
  applicationName: [],
  count: 0,
  bestPerformersList: [],
  archiveData: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.GET_STOCK_COUNT_SUCCESS: return { ...state, count: action.payload };
    case constants.GET_ARCHIVE_DATA_SUCCESS: return { ...state, archiveData: action.payload };
    case constants.GET_STOCK_BEST_PERFORMER_SUCCESS: return { ...state, bestPerformersList: action.payload };
    case constants.GET_APPLICATION_NAME_SUCCESS: return { ...state, applicationName: action.payload };
    case constants.CLICK_ON_TOP_LEVEL_COMPONENT: return { ...state, clicked: state.clicked + 1 };
    default: return { ...state };
  }
}
