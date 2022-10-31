const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf } = format;

let logger;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`;
});

const initialiseerLogger = (level, disabled) => {
  logger = createLogger({
    level: "silly",
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console({
        silent: disabled,
      }),
    ],
  });
};

const getLogger = () => {
  if (!logger) throw new Error("Initialiseren van logger mislukt");
  return logger;
};

module.exports = {
  getLogger,
  initialiseerLogger,
};
