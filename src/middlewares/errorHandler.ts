import express from 'express';

function ErrorHandler(Error: any,req: any,res: any,next: express.NextFunction) {
  res.status(Error.status || 500);
  res.send({ error: true, message: Error.message || 'Internal server Error' });
}

export default ErrorHandler;
