const LOG_LEVELS = {
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
};

// Мінімальний рівень логування (наприклад, виводимо все від INFO і вище)
const MIN_LOG_LEVEL = LOG_LEVELS.DEBUG;

const Logger = {
    log: (level, message, data = null) => {
        if (Object.values(LOG_LEVELS).indexOf(level) < Object.values(LOG_LEVELS).indexOf(MIN_LOG_LEVEL)) {
            return;
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
        };

        if (level === LOG_LEVELS.DEBUG || level === LOG_LEVELS.INFO) {
            console.log(`🔵[${level.toUpperCase()}]`, message, data ?? " - No additional data");
        } else if (level === LOG_LEVELS.WARN) {
            console.warn(`🟡[${level.toUpperCase()}]`, message, data ?? " - No additional data");
        } else if (level === LOG_LEVELS.ERROR) {
            console.error(`🔴[${level.toUpperCase()}]`, message, data ?? " - No additional data");
            // Відправка на сервер
            // Logger.sendLogToServer(logEntry);
        }
    },

    debug: (message, data) => Logger.log(LOG_LEVELS.DEBUG, message, data),
    info: (message, data) => Logger.log(LOG_LEVELS.INFO, message, data),
    warn: (message, data) => Logger.log(LOG_LEVELS.WARN, message, data),
    error: (message, data) => Logger.log(LOG_LEVELS.ERROR, message, data),

    sendLogToServer: async (logEntry) => {
        try {
            await fetch("/api/logs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logEntry),
            });
        } catch (error) {
            console.warn("Failed to send log to server", error);
        }
    },
};

export default Logger;
