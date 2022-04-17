import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    jwksUri: "https://dev-v3sgfmsg.us.auth0.com/.well-known/jwks.json",
  }),

  // Validate the audience and the issuer.
  audience: "https://api.recipe",
  // audience: process.env.AUTH0_AUDIENCE,
  // issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  issuer: "https://dev-v3sgfmsg.us.auth0.com/",

  algorithms: ["RS256"],
});
