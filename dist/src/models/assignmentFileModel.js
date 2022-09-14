"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentFile = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const fileModel_1 = require("./fileModel");
let AssignmentFile = class AssignmentFile extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], AssignmentFile.prototype, "idassignmentFile", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], AssignmentFile.prototype, "name_assignment_file", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        values: ['active', 'inactive'],
        defaultValue: 'active',
    })
], AssignmentFile.prototype, "status_assignment_file", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => fileModel_1.File)
], AssignmentFile.prototype, "file", void 0);
AssignmentFile = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'assingment_file',
    })
], AssignmentFile);
exports.AssignmentFile = AssignmentFile;
