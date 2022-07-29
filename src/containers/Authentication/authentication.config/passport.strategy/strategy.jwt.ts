import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import {User} from '../../authentication.model'

let opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Emmijozzy"
};


const strategy = new JwtStrategy(opts, (payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
    .catch(err => {
      return done(err, false);
    });
})

export default strategy;