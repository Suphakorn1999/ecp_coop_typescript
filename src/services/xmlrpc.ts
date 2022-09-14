const xmlrpc = require('xmlrpc');
import dotenv from 'dotenv';
dotenv.config();

class XmlRpcService {
  static decryptxml(data: string) {
    const client = xmlrpc.createSecureClient(process.env.URL_SERVER);
    return new Promise((resolve, reject) => {
        const xmlData = {
          ciphertext: data,
          secret: process.env.secret,
        };
        return client.methodCall('decrypt', [xmlData.ciphertext,xmlData.secret], (err:any, value:any) => {
          if(err){
            return reject(err);
          }
          return resolve(value);
        })
      });
    }
}

module.exports = XmlRpcService;
