import winston from "winston";

const customLevel = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "blue",
    debug: "green",
  },
};

const logger = winston.createLogger({
  levels: customLevel.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevel.colors,
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "fatal",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevel.colors,
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevel.colors,
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./loggers.log",
      level: "warning",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevel.colors,
        }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./loggers.log",
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevel.colors,
        }),
        winston.format.simple()
      ),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  (req.logger = logger),
    req.logger.debug(
      `${req.method} en: ${req.url} - ${new Date().toLocaleTimeString()}`
    );
  next();
};
