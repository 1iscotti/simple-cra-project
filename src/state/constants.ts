// 首页
export const SET_USER_INFO = 'SET_USER_INFO';


export interface IEventType {
    [key: number]: string
}
export interface IErrorType {
    [key: number]: string
}
export interface IEnvType {
    [key: number]: string
}
export interface IDeviceTYPE {
    [key: number]: string
}


export const EVENT_TYPE: IEventType = { 1: '点击', 2: '自定义' }
export const ERROR_TYPE: IErrorType = { 1: '语法错误', 2: '引用错误', 3: '范围错误', 4: '类型错误', 5: 'URL错误' }
export const ENV_TYPE: IEnvType = { 1: 'online', 2: 'uat' }
export const DEVICE_TYPE: IDeviceTYPE = { 1: 'pc', 2: '手机' }
