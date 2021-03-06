import express = require("express");
import cors = require("cors");
require("dotenv").config();
import * as bodyParser from "body-parser";
import graphqlHTTP = require("express-graphql");
import schema from "./schema/schema";
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { appendFile } from "fs";
import models = require("./models/index.js");
const session = require("express-session");
const knexConfig = require("./db/knex");
const knex = require("knex")(knexConfig);
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const RedisStore = require('connect-redis')(session);
const redis = require("redis"),

  client = redis.createClient();


const server = express();

// enable cors (Apollo Legitamate)
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};

server.use(cors(corsOptions));

// set up session cookies
// server.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [keys.session.cookieKey]
// }));


server.use(session({
  secret: [keys.session.cookieKey],
  resave: false,
  store: new RedisStore({ host: 'localhost', port: 6379, client: client }),
  saveUninitialized: false,
  // cookie: { secure: true }
}))



// initialize passport
server.use(passport.initialize());
server.use(passport.session());

// // set view engine
// server.set('view engine', 'ejs');

// set up routes
server.use('/auth', authRoutes);

// create home route
server.get('/', (req, res) => {
  res.send('home');
});



// Binding express with graphql

server.use(
  "/graphql",
  bodyParser.json(),
  (req, _, next) => {
    return next();
  },
  graphqlHTTP(req => ({
    schema,
    context: { req },
    graphiql: true
  }))
);


server.listen(process.env.PORT, () => {
  console.log("express is listening for requests on port 4000");
});
