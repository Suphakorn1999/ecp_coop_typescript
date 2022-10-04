"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./src/config/config"));
const errorHandler_1 = __importDefault(require("./src/middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    credentials: true,
    origin: '*',
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(errorHandler_1.default);
app.use((0, cookie_parser_1.default)());
const companyRouter_1 = __importDefault(require("./src/routes/companyRouter"));
const provinceRouter_1 = __importDefault(require("./src/routes/provinceRouter"));
const studentRouter_1 = __importDefault(require("./src/routes/studentRouter"));
const loginRouter_1 = __importDefault(require("./src/routes/loginRouter"));
const logoutRouter_1 = __importDefault(require("./src/routes/logoutRouter"));
const activityRouter_1 = __importDefault(require("./src/routes/activityRouter"));
const uploadRouter_1 = __importDefault(require("./src/routes/uploadRouter"));
const teacherRouter_1 = __importDefault(require("./src/routes/teacherRouter"));
const meetingRouter_1 = __importDefault(require("./src/routes/meetingRouter"));
const yearRouter_1 = __importDefault(require("./src/routes/yearRouter"));
const factoryRouter_1 = __importDefault(require("./src/routes/factoryRouter"));
const branchRouter_1 = __importDefault(require("./src/routes/branchRouter"));
const downloadRouter_1 = __importDefault(require("./src/routes/downloadRouter"));
const adminRouter_1 = __importDefault(require("./src/routes/adminRouter"));
const roleRouter_1 = __importDefault(require("./src/routes/roleRouter"));
const pointRouter_1 = __importDefault(require("./src/routes/pointRouter"));
const pointfm10_20Router_1 = __importDefault(require("./src/routes/pointfm10_20Router"));
const pointfm10_18Router_1 = __importDefault(require("./src/routes/pointfm10_18Router"));
const pointfm10_21Router_1 = __importDefault(require("./src/routes/pointfm10_21Router"));
const assignmentfileRouter_1 = __importDefault(require("./src/routes/assignmentfileRouter"));
const formRouter_1 = __importDefault(require("./src/routes/formRouter"));
const fileRouter_1 = __importDefault(require("./src/routes/fileRouter"));
app.use('/company', companyRouter_1.default);
app.use('/province', provinceRouter_1.default);
app.use('/student', studentRouter_1.default);
app.use('/login', loginRouter_1.default);
app.use('/logout', logoutRouter_1.default);
app.use('/activity', activityRouter_1.default);
app.use('/upload', uploadRouter_1.default);
app.use('/teacher', teacherRouter_1.default);
app.use('/meeting', meetingRouter_1.default);
app.use('/year', yearRouter_1.default);
app.use('/factory', factoryRouter_1.default);
app.use('/branch', branchRouter_1.default);
app.use('/download', downloadRouter_1.default);
app.use('/admin', adminRouter_1.default);
app.use('/role', roleRouter_1.default);
app.use('/fm10_14', pointRouter_1.default);
app.use('/fm10_20', pointfm10_20Router_1.default);
app.use('/fm10_18', pointfm10_18Router_1.default);
app.use('/fm10_21', pointfm10_21Router_1.default);
app.use('/assignmentfile', assignmentfileRouter_1.default);
app.use('/form', formRouter_1.default);
app.use('/file', fileRouter_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => {
    res.send(`<h1 style=text-align:center;>
    🎉Welcome To API ECP_Cooperative🎉
    </h1>`);
});
config_1.default
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
