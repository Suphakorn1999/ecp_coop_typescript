import { Sequelize } from 'sequelize-typescript';
import { Company } from '../models/companyModel';
import { Province } from '../models/provinceModel';
import { Student } from '../models/studentModel';
import { Activity } from '../models/activityModel';
import { Activity_Student } from '../models/activity_studentModel';
import { File } from '../models/fileModel';
import { Teacher } from '../models/teacherModel';
import { Student_Company } from '../models/student_companyModel';
import { Meeting } from '../models/meetingModel';
import { Year } from '../models/YearModel';
import { Factory } from '../models/factoryModel';
import { Branch } from '../models/branchModel';
import { Fm10_14_coop } from '../models/fm10_14coopModel';
import { Admin } from '../models/adminModel';
import { Role } from '../models/roleModel';
import { Qualification } from '../models/qualificationModel';
import { Fm10_20_coop } from '../models/fm10_20coopModel';
import { Form } from '../models/formModel';
import { Question } from '../models/questionModel';
import { Answerfm10_14 } from '../models/answerModel';
import { Answerfm10_20 } from '../models/answer10_20Model';
import { Fm10_18_coop } from '../models/fm10_18coopModel';
import { Answerfm10_18 } from '../models/answer10_18Model';
import { Fm10_21_coop } from '../models/fm10_21coopModel';
import { Answerfm10_21 } from '../models/answer10_21Model';
import { Fm10_11_coop } from '../models/fm10_11coopModel';
import { Answerfm10_11 } from '../models/answer10_11Model';
import { AssignmentFile } from '../models/assignmentFileModel';
import { Study_group } from '../models/study_groupModel';
import { Activity_Year } from '../models/activity_yearModel';
import { Fm10_13_coop } from '../models/fm10_13coopModel';
import { Answerfm10_13 } from '../models/answer10_13Model';
import { Meeting_Times } from '../models/meetingtimesModel';
import { Enroll } from '../models/enrollModel';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'ecpcoop',
  logging: false,
  models: [
    Year,
    Company,
    Province,
    Student,
    Activity,
    Activity_Student,
    File,
    Teacher,
    Student_Company,
    Meeting,
    Factory,
    Branch,
    Admin,
    Role,
    Qualification,
    Form,
    Question,
    Answerfm10_14,
    Fm10_14_coop,
    Fm10_20_coop,
    Answerfm10_20,
    Fm10_18_coop,
    Answerfm10_18,
    Fm10_21_coop,
    Answerfm10_21,
    Fm10_11_coop,
    Answerfm10_11,
    AssignmentFile,
    Study_group,
    Activity_Year,
    Fm10_13_coop,
    Answerfm10_13,
    Meeting_Times,
    Enroll,
  ],
  sync: { force: false, alter: true },
});

export default connection;


