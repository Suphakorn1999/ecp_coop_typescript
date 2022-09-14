"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const factoryModel_1 = require("./factoryModel");
const sequelize_typescript_1 = require("sequelize-typescript");
const teacherModel_1 = require("./teacherModel");
const studentModel_1 = require("./studentModel");
let Branch = class Branch extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Branch.prototype, "idbranch", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => factoryModel_1.Factory),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Branch.prototype, "idfactory", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Branch.prototype, "name_branch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => factoryModel_1.Factory)
], Branch.prototype, "factory", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => teacherModel_1.Teacher)
], Branch.prototype, "teachers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => studentModel_1.Student)
], Branch.prototype, "students", void 0);
Branch = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'branch',
    })
], Branch);
exports.Branch = Branch;
