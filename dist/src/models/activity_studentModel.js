"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity_Student = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const activityModel_1 = require("./activityModel");
const studentModel_1 = require("./studentModel");
let Activity_Student = class Activity_Student extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Activity_Student.prototype, "idactivity_student", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => activityModel_1.Activity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Activity_Student.prototype, "idactivity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => activityModel_1.Activity)
], Activity_Student.prototype, "activity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => studentModel_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Activity_Student.prototype, "idstudent", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => studentModel_1.Student)
], Activity_Student.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: '',
        values: ['pass', 'progress', 'fail'],
    })
], Activity_Student.prototype, "status_activity", void 0);
Activity_Student = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'activity_student',
    })
], Activity_Student);
exports.Activity_Student = Activity_Student;
