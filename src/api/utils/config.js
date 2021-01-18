import axios from 'axios';
import * as urls from './urls';
import store from '../../store/store';
export default () => {
  // Add a request interceptor

  axios.interceptors.request.use(
    (config) => {
      const userData = store.getState().auth.userData;

      config.baseURL = config.baseURL || urls.BASE_URL;

      return {
        ...config,
        headers: {
          ...config.headers,
          'Accept-Language': store.getState().lang.lang,
          apiLang: store.getState().lang.lang,
          // 'Content-Type': 'multipart/form-data',
          ...(config.headers.Authorization === 'false'
            ? {}
            : {
                Authorization: userData
                  ? `Bearer ${userData.access_token}`
                  : config.headers.Authorization,
              }),
        },
      };
    },
    (error) => {
      console.log('conferr', error);
      return Promise.reject(error);
    },
  );
  // axios.interceptors.response.use(
  //   function (response) {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     // console.log(response.data, 'interceptor');
  //     // console.log(response, 'interceptor');
  //     if (response.data.code === 409 && store.getState().auth.userData) {
  //       authRepo.logoutPrincipalUser();
  //       showError(I18n.t('account-deactivated'));
  //     }
  //     return response;
  //   },
  //   function (error) {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error

  //     return Promise.reject(error);
  //   },
  // );
};

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     return new Promise((resolve, reject) => {
//       const originalReq = err.config;
//       if (
//         err.response.status === 401 &&
//         err.config &&
//         !err.config.__isRetryRequest
//       ) {
//         originalReq._retry = true;

//         let res = fetch(`${urls.APP_BASE_URL}refresh`, {
//           method: 'POST',
//           mode: 'cors',
//           cache: 'no-cache',
//           credentials: 'same-origin',
//           headers: {
//             'Content-Type': 'application/json',
//             Device: 'device',
//             Token: localStorage.getItem('token'),
//           },
//           redirect: 'follow',
//           referrer: 'no-referrer',
//           body: JSON.stringify({
//             token: localStorage.getItem('token'),
//             refresh_token: localStorage.getItem('refresh_token'),
//           }),
//         })
//           .then((res) => res.json())
//           .then((res) => {
//             console.log(res);
//             this.setSession({token: res.token, refresh_token: res.refresh});
//             originalReq.headers.Token = res.token;
//             originalReq.headers.Device = 'device';

//             return axios(originalReq);
//           });

//         resolve(res);
//       }

//       return Promise.reject(err);
//     });
//   },
// );
