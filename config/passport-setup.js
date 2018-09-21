const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const knexConfig = require("../db/knex");
const knex = require("knex")(knexConfig);

passport.serializeUser((user, done) => {

    console.log('user array:', user)
    console.log('Serializing this homie', user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    knex.select().table('google_users').where({ id: id }).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function

        const googleUsers = await knex.select().table('google_users').where({ google_id: profile.id }).limit(1);

        if (googleUsers.length === 0) {
            knex("google_users").insert({
                name: profile.displayName,
                google_id: profile.id
            }).then(columns => {
                console.log(columns, 'returning');
                done(null, googleUsers);
            });

        } else {

            console.log(googleUsers);
            const convert = googleUsers[0];
            done(null, convert);
        }
    })
);