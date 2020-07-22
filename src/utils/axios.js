import axios from 'axios';

/**
 * 공통 환경설정
 */
axios.defaults.baseURL = process.env.API_SERVER_URL;

/**
 * 에러처리
 */


/**
 * 로깅기능
 */



export { axios };