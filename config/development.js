module.exports = {
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "opdracht",
    username: "root",
    password: "root",
  },
  auth: {
    argon: {
      saltLength: 16, // bytes
      hashLength: 32, // bytes
      timeCost: 6,
      memoryCost: 2 ** 17, // 128 MiB (byte = 1024 bits)
    },
    jwt: {
      secret:
        "halloikbenjasperikbentwintigjaaroudikkanmetdrietennisballenjonglerenzonderproblemen",
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "klauwaerts.wiki.be",
      audience: "klauwaerts.wiki.be",
    },
  },
};
