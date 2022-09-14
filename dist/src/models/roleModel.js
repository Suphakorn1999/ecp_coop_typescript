"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const adminModel_1 = require("./adminModel");
const studentModel_1 = require("./studentModel");
const sequelize_typescript_1 = require("sequelize-typescript");
const teacherModel_1 = require("./teacherModel");
let Role = class Role extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Role.prototype, "idrole", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Role.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => teacherModel_1.Teacher)
], Role.prototype, "teachers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => studentModel_1.Student)
], Role.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => adminModel_1.Admin)
], Role.prototype, "admins", void 0);
Role = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'role',
    })
], Role);
exports.Role = Role;
