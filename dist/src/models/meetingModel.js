"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meeting = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_companyModel_1 = require("./student_companyModel");
const teacherModel_1 = require("./teacherModel");
let Meeting = class Meeting extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Meeting.prototype, "idmeeting", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_companyModel_1.Student_Company),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Meeting.prototype, "idstudent_company", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => teacherModel_1.Teacher),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Meeting.prototype, "idteacher", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Meeting.prototype, "name_project", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Meeting.prototype, "startdate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Meeting.prototype, "enddate", void 0);
Meeting = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'meeting',
    })
], Meeting);
exports.Meeting = Meeting;
