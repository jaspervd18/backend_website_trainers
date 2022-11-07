module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: [
      "http://localhost:3000",
      "https://Schermgilde-De-Klauwaerts.github.io",
    ],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "wiki_klauwaerts",
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      expirationInterval: 3 * 24 * 60 * 60 * 1000,
      issuer: "klauwaerts.wiki.be",
      audience: "klauwaerts.wiki.be",
    },
  },
};
