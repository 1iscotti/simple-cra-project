import { SET_USER_INFO } from './constants';

const initialState: any = {
  userInfo: {},
  // projectName: getCookie('projectName') || ''
};

function commonReducer(state = initialState, action: SofaAction.Action) {
  switch (action.type) {
    case SET_USER_INFO:
      (window as any).Longan.updateConfig({
        loginUser: action.payload.uid,
        additional_info: {
          phone: action.payload.phone, name: action.payload.username
        }
      });
      return { ...state, userInfo: action.payload };
    // case UPDATE_PROJECT_NAME:
    //   return { ...state, projectName: action.payload };
    default:
      return state;
  }
}

export default commonReducer;
