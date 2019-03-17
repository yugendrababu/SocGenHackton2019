import constants from './swift-app-constants';

export const getSwiftCount = () => ({ type: constants.GET_SWIFT_COUNT_ACTION });

export const getSwiftArchiveData = (field, limit, offset, category) =>
  ({ type: constants.GET_ARCHIVE_DATA_ACTION, payload: { field, limit, offset, category } });
