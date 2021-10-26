import { getRequest } from "../utils/utils";

export const getLoginUserService = () => {
    return getRequest('/user/getLoginUser');
}
