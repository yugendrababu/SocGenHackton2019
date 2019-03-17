import constants from './swift-app-constants';

const initialState = {
  stats: {},
  bestPerformersList: [],
  archiveData: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.GET_SWIFT_COUNT_SUCCESS: return { ...state, stats: action.payload };
    case constants.GET_ARCHIVE_DATA_SUCCESS: return { ...state, archiveData: action.payload };
    case constants.CLICK_ON_TOP_LEVEL_COMPONENT: return { ...state, clicked: state.clicked + 1 };
    default: return { ...state };
  }
}
