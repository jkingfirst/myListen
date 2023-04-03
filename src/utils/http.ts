import Config from 'react-native-config';
import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
export interface RequestConfig extends AxiosRequestConfig {
  mock?: boolean; // 是否模拟
}
export type DataType = {[key: string]: any};
const ICODE = 'C3A6C2D409030E37';
const headerToken = {
  icode: ICODE,
};
class Http {
  settings: RequestConfig;
  defaultSetting: RequestConfig;
  constructor(options: RequestConfig) {
    this.defaultSetting = {
      baseURL: Config.API_URL,
      timeout: 30000,
    };
    this.settings = {...this.defaultSetting, ...options};
  }
  create(options: RequestConfig): AxiosInstance {
    let conf = {...this.settings, ...options};
    conf.headers = options.headers
      ? {
          ...options.headers,
          ...headerToken,
        }
      : {
          ...headerToken,
        };
    return axios.create(conf);
  }
  interceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use(
      function (config) {
        return config;
      },
      function (err) {
        return Promise.reject(err);
      },
    );
    instance.interceptors.response.use(
      function (res) {
        return res.data;
      },
      function (err) {
        console.log(err.toString(), '++++++');
        return Promise.reject(err);
      },
    );
  }
  get(url: string, data?: DataType, options?: RequestConfig) {
    let conf = {url: url, params: data ? data : {}, method: 'GET', ...options};
    let instance = this.create(conf);
    this.interceptors(instance);
    return instance(conf);
  }
  post(url: string, data?: DataType, options?: RequestConfig) {
    let conf = {url: url, data: data ? data : {}, method: 'POST', ...options};
    let instance = this.create(conf);
    this.interceptors(instance);
    return instance(conf);
  }
}
export default Http;
