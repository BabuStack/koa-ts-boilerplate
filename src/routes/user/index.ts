import Router from '@koa/router';
import UserModule from 'src/modules/user/api';

const userRouter = new Router({
  prefix: '/user'
});

userRouter.get('/details', async (ctx) => {
  const user = await UserModule.getById(ctx.state.user._id);

  ctx.status = 200;
  ctx.body = user;
});

export default userRouter;
