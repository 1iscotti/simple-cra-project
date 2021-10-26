declare namespace SofaAction {
  // redux action
  type Action = {
      type: string;
      payload?: any;
      // loading 状态触发的Action
      loadingAction?: (loading: boolean) => Action;
      loadingSubmit?: ([]: string[]) => Action;
      // 异步Action调用的服务端服务
      service?: any; // TODO 搞半天没成功，放弃了；
      // 异步Action调用参数
      params?: object;
      // 异步Action调用成功后的Action
      success?: (Action | ActionCreator | any);
  }
  // redux action creator
  type ActionCreator = (params?: any, callback?: any) => Action;
}

declare type SofaState = Map<string, any>;

// 分页
declare interface IPagination {
  page?: number;
  total: number;
  pageSize: number;
  showTotal?: boolean;
  onChange?: (page: number) => void;
  current?:number
}

// 弹窗数据格式；
declare interface IModalData {
  show: boolean;
  type?: OperateType;
  // 将弹窗渲染数据放置于data中，一般讲是提交到后端的数据
  data?: Dictionary<any>;
  [key: string]: any;
}

// 后端返回数据；
declare interface IResponseData<T> {
  status: 0 | -1;
  message: string | null;
  data: T;
  logId?: string | number;
}