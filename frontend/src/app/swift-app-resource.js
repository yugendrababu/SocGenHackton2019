import axios from './helper/axios';

const SWIFT_COUNT_API = '/api/swift/stats';
const SWIFT_ARCHIVE_DATA = '/api/stocks/archives';

export const getSwiftCountApi = () => axios.get(SWIFT_COUNT_API)
  .then(response => response.data);


export const getSwiftArchiveDataApi = (field, limit, offset, stockName) =>
  axios.get(`${SWIFT_ARCHIVE_DATA}?field=${field}&limit=${limit}&offset=${offset}&category=${category ? category : ''}`,
    {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    .then(response => response.data);
