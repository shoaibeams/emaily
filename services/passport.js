const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

//creating a user token with user id, not profile id
passport.serializeUser((user, done) => {
  done(null, user.id) //id === _id
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id })
      if (existingUser) {
        //we already have a user
        done(null, existingUser)
      } else {
        const user = await new User({ googleID: profile.id }).save()
        done(null, user)
      }
    }
  )
)
