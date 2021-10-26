import { SET_USER_INFO } from './constants';
import { getLoginUserService } from './service';

// 首页
export const setUserInfo = (payload: object) => {
  return {
    type: SET_USER_INFO,
    payload: payload
  };
};

export const getLoginUser = () => {
  return (dispatch: any) => {
    getLoginUserService()
      .then((data) => {
        if (data) {
          dispatch(setUserInfo(data));
        } else {
          // 跳转
          // window.location.href = PASSURL;
        }
      })
      // .catch((err) => {
      //   window.location.href = PASSURL;
      // });
  };
};

// export const getLogout = () => {
//   return (dispatch: any) => {
//     getLogoutService().then((data) => {
//       // // 跳转
//       window.location.href = PASSURL;
//     });
//   };
// };

