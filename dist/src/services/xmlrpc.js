"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xmlrpc = require('xmlrpc');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class XmlRpcService {
    static decryptxml(data) {
        const client = xmlrpc.createSecureClient(process.env.URL_SERVER);
        return new Promise((resolve, reject) => {
            const xmlData = {
                ciphertext: data,
                secret: process.env.secret,
            };
            return client.methodCall('decrypt', [xmlData.ciphertext, xmlData.secret], (err, value) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            });
        });
    }
}
module.exports = XmlRpcService;
