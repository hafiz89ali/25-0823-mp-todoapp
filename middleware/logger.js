function logger(req, res, next) {
    const ip = req.ip;
    const url = req.url;
    const method = req.method;
    const log = `${method} | ${status} | ${url} | ${ip}`;
    console.log(log);
    next();
}

export default logger;