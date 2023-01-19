import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connection from './src/config/config';
import errorHandler from './src/middlewares/errorHandler';
import cookieParser from 'cookie-parser';

dotenv.config();


const app: Express = express();

const port = process.env.PORT;
app.use(
  cors({
    credentials: true, 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Host, Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-XSRF-TOKEN, Origin, Access-Control-Request-Origin, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin, access-control-allow-origin, Access-Control-Allow-Credentials, access-control-allow-credentials, Access-Control-Allow-Headers, access-control-allow-headers, Access-Control-Allow-Methods, access-control-allow-methods']
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);
app.use(cookieParser());


import companyRouter from './src/routes/companyRouter';
import provinceRouter from './src/routes/provinceRouter';
import studentRouter from './src/routes/studentRouter';
import loginRouter from './src/routes/loginRouter';
import logout from './src/routes/logoutRouter';
import activity from './src/routes/activityRouter';
import uploadfile from './src/routes/uploadRouter';
import teacherRouter from './src/routes/teacherRouter';
import meetingRouter from './src/routes/meetingRouter';
import yearRouter from './src/routes/yearRouter';
import factory from './src/routes/factoryRouter';
import branch from './src/routes/branchRouter';
import downloadRouter from './src/routes/downloadRouter';
import adminRouter from './src/routes/adminRouter';
import roleRouter from './src/routes/roleRouter';
import pointRouter from './src/routes/pointRouter';
import pointFm10_20Router from './src/routes/pointfm10_20Router';
import pointFm10_18Router from './src/routes/pointfm10_18Router';
import pointFm10_21Router from './src/routes/pointfm10_21Router';
import assignmentfileRouter from './src/routes/assignmentfileRouter';
import formRouter from './src/routes/formRouter';
import fileRouter from './src/routes/fileRouter';
import qualificationRouter from './src/routes/qualificationRouter';
import pointFm10_11Router from './src/routes/pointfm10_11Router';
import study_groupRouter from './src/routes/study_groupRouter';
import pointFm10_13Router from './src/routes/pointfm10_13Router';
import meetingtimesRouter from './src/routes/meetingtimesRouter';

app.use('/company', companyRouter);
app.use('/province', provinceRouter);
app.use('/student', studentRouter);
app.use('/login', loginRouter);
app.use('/logout', logout);
app.use('/activity', activity);
app.use('/upload', uploadfile);
app.use('/teacher', teacherRouter);
app.use('/meeting', meetingRouter);
app.use('/year', yearRouter);
app.use('/factory', factory);
app.use('/branch', branch);
app.use('/download', downloadRouter);
app.use('/admin', adminRouter);
app.use('/role', roleRouter);
app.use('/fm10_14', pointRouter);
app.use('/fm10_20', pointFm10_20Router);
app.use('/fm10_18', pointFm10_18Router);
app.use('/fm10_21', pointFm10_21Router);
app.use('/assignmentfile', assignmentfileRouter);
app.use('/form', formRouter);
app.use('/file', fileRouter);
app.use('/qualification', qualificationRouter);
app.use('/fm10_11', pointFm10_11Router);
app.use('/study_group', study_groupRouter);
app.use('/fm10_13', pointFm10_13Router);
app.use('/meetingtimes', meetingtimesRouter);

app.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
  },
);
app.get('/', (req, res) => {
  res.send(
    `<h1 style=text-align:center;>
    🎉Welcome To API ECP_Cooperative🎉
    </h1>`,
  );
});
connection
  .sync()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Err', err);
  });

app.listen(port, () => {
 console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
