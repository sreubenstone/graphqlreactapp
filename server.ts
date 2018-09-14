import express = require("express");
import cors = require("cors");
require("dotenv").config();
import graphqlHTTP = require("express-graphql");
import schema from "./schema/schema";
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { appendFile } from "fs";

const server = express();
server.use(cors());

passport.use(
  new FacebookStrategy(
    {
      clientID: "450892708651366",
      clientSecret: "43cede2cdbd7438b663ab04d1251ee01",
      callbackURL: "https://801b974b.ngrok.io/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      cb(null, profile);
    }
  )
);

server.use(passport.initialize());

server.get("/auth/facebook", passport.authenticate("facebook"));

server.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.send("AUTH WAS GOOD");
  }
);

// Binding express with graphql

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(process.env.PORT, () => {
  console.log("express is listening for requests on port 4000");
});
