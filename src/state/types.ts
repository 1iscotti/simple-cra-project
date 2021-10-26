export interface ICommonReducer {
  [key: string]: any;
}

export interface IStoreReducer {
  commonReducer: ICommonReducer;
}