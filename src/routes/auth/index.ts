import Router from '@koa/router';
import passport from 'koa-passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModule from 'src/modules/user/api';
import type {
  User, UserMin
} from 'src/modules/user/types';
import JWT from './jwt';

const authRouter = new Router();

passport.serializeUser<string>((user: User, done) => {
  done(null, user._id.toHexString());
});

passport.deserializeUser<string>(async (id: string, done: (error?: Error, user?: UserMin) => void) => {
  const user = await UserModule.getByIdMin(id);
  done(user ? null : new Error('User not found'), user);
});

/**************** Google oAuth2 strategy ****************/
passport.use(
  new GoogleStrategy(
    {
      clientID     : process.env.GOOGLE_OAUTH_CLIENTID,
      clientSecret : process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL  : '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await UserModule.upsert({
          oauth: {
            provider : 'google',
            id       : profile.id,
          },
          firstName   : profile.name.givenName,
          lastName    : profile.name.familyName,
          avatar      : profile.photos[0].value,
          email       : profile.emails[0].value,
          displayName : profile.displayName,
          dob         : new Date(),
          phone       : '',
        });


        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Googe Oauth2
authRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

const redirectBaseURL = 'https://my-domain.com';
// Google Oauth2 callback url
authRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${redirectBaseURL}/error`,
  }),
  (ctx) => {
    const token = JWT.sign(ctx.state.user._id.toHexString());
    ctx.redirect(`${redirectBaseURL}/success?token=${token}`);
  }
);

export default authRouter;
