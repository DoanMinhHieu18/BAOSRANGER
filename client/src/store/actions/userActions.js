import actionTypes from "./actionTypes";
import { getUserInfoService } from "../../services/userService"
export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});
export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const getUserInfo = (userInfo) => {
  return async (dispatch, getState) => {
    try {
      let user = await getUserInfoService(userInfo.email);
      if (user && user.errCode === 0) {
        dispatch(getUserInfoSuccess(user))
      } else {
        dispatch(getUserInfoFail())
      }
    } catch (e) {
      dispatch(getUserInfoFail())
    }
  }
}

export const getUserInfoSuccess = (data) => ({
  type: actionTypes.GET_USER_INFO_SUCCESS,
  data: data
})

export const getUserInfoFail = () => ({
  type: actionTypes.GET_USER_INFO_FAIL
})
