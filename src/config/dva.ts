import {create} from 'dva-core-ts';
import models from '@m/index';
// 1, 创建dva
const app = create();
// 2,加载model
models.forEach(model => {
  app.model(model);
});
// 3,启动dva
app.start();
// 4, 导出dva store数据
export default app._store;
