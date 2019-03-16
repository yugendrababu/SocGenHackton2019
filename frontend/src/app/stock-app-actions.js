import constants from './stock-app-constants';

export const getStockCount = () => ({ type: constants.GET_STOCK_COUNT_ACTION });

export const getStockBestPerformers = () => ({ type: constants.GET_STOCK_BEST_PERFORMER_ACTION });

export const getStockArchiveData = (field, limit, offset, stockName) =>
  ({ type: constants.GET_ARCHIVE_DATA_ACTION, payload: { field, limit, offset, stockName } });
