import axios, {AxiosRequestConfig, AxiosResponse, AxiosInstance} from 'axios';
import Config from 'react-native-config';
type Conf = {[key: string]: unknown};
export interface RequestConfig extends AxiosRequestConfig {
  headers: any;
}
const ICODE = '00310DF430F5B9BB';
class Http {
  defaultSetting: Conf;
  constructor() {
    this.defaultSetting = {
      baseUrl: Config.API_URL,
      timeout: 10000,
    };
  }
  create(options: RequestConfig): AxiosInstance {
    let conf = {...this.defaultSetting, ...options};
    conf.headers = options.headers
      ? options.headers
      : {
          icode: ICODE,
        };
    return axios.create(conf);
  }
  interceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use(
      function (config: RequestConfig) {
        return config;
      },
      function (err) {
        return Promise.reject(err);
      },
    );
    instance.interceptors.response.use(
      function (res: AxiosResponse) {
        return res.data;
      },
      function (err) {
        return Promise.reject(err);
      },
    );
  }

  get(url: string, data: unknown, options: RequestConfig) {
    let conf = {url: url, params: data, method: 'GET', ...options};
    let instance = this.create(conf);
    this.interceptors(instance);
    return instance(options);
  }
  post(url: string, data: unknown, options: RequestConfig) {
    let conf = {url: url, data: data, method: 'POST', ...options};
    let instance = this.create(conf);
    this.interceptors(instance);
    return instance(options);
  }
}
export default Http;
