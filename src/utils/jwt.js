const expressJWT = require("express-jwt");

exports.authJWT = () => {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;
  return expressJWT({
    secret,
    algorithms: ["HS256"],
    isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["POST", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
};

async function isRevoked(req, payload, done) {
  console.log(req.url);
  console.log(req.method);

  if (payload.isAdmin) {
    done();
  }

  done(null, true);
}
