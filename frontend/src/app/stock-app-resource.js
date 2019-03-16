import axios from './helper/axios';

const STOCK_COUNT_API = '/api/stocks/count';
const STOCK_BEST_PERFORMERS_API = '/api/stocks/bestPerformers';
const STOCK_ARCHIVE_DATA = '/api/stocks/archives';

export const getStockCountApi = () => axios.get(STOCK_COUNT_API)
  .then(response => response.data.count);

export const getStockBestPerformersApi = () => axios.get(STOCK_BEST_PERFORMERS_API)
  .then(response => response.data);

export const getStockArchiveDataApi = (field, limit, offset, stockName) =>
  axios.get(`${STOCK_ARCHIVE_DATA}?field=${field}&limit=${limit}&offset=${offset}&symbol=${stockName ? stockName : ''}`,
    {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    .then(response => response.data);
