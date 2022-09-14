"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorHandler(Error, req, res, next) {
    res.status(Error.status || 500);
    res.send({ error: true, message: Error.message || 'Internal server Error' });
}
exports.default = ErrorHandler;
