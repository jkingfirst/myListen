import {create, Model} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import models from '@m/index';
const [home] = models;
// 1, 创建dva
const app = create();
// 2,加载model
models.forEach(model => {
  app.model(model);
});
app.use(createLoading());
// 3,启动dva
app.start();
// 4, 导出dva store数据
export default app._store;
interface ModelCache {
  [key: string]: boolean;
}
const modelCache: ModelCache = {
  home: true,
};
function registerModel(model: Model) {
  if (!modelCache[model.namespace]) {
    app.model(model);
    modelCache[model.namespace] = true;
  }
}
export const createModel = (namespace: string) => {
  const model = modelExtend(home, {
    namespace,
  });
  registerModel(model);
};
