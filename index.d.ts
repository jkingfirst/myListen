declare module 'dva-model-extend' {
  import {Model} from 'dva-core-ts';
  import {modelExtend} from '@conf/dva';
  export default function modelExtend(...models: Model[]): Model;
}
declare module '*.png';
