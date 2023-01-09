"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const activity_studentModel_1 = require("./activity_studentModel");
const branchModel_1 = require("./branchModel");
const fileModel_1 = require("./fileModel");
const roleModel_1 = require("./roleModel");
const student_companyModel_1 = require("./student_companyModel");
const study_groupModel_1 = require("./study_groupModel");
const YearModel_1 = require("./YearModel");
let Student = class Student extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Student.prototype, "idstudent", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roleModel_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Student.prototype, "idrole", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roleModel_1.Role)
], Student.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(14),
        allowNull: false,
    })
], Student.prototype, "student_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false,
    })
], Student.prototype, "prename_student", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    })
], Student.prototype, "fname_student", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    })
], Student.prototype, "lname_student", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => YearModel_1.Year),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    })
], Student.prototype, "idyear", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => YearModel_1.Year)
], Student.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => branchModel_1.Branch),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Student.prototype, "idbranch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => branchModel_1.Branch)
], Student.prototype, "branch", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => study_groupModel_1.Study_group),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    })
], Student.prototype, "idstudy_group", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => study_groupModel_1.Study_group)
], Student.prototype, "study_group", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Student.prototype, "username_student", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        values: ['satisfied', 'unsatisfied', 'null'],
        defaultValue: 'unsatisfied',
    })
], Student.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_companyModel_1.Student_Company)
], Student.prototype, "student_companies", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => activity_studentModel_1.Activity_Student)
], Student.prototype, "activity_students", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => fileModel_1.File)
], Student.prototype, "files", void 0);
Student = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'student',
    })
], Student);
exports.Student = Student;
