"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const assignmentFileModel_1 = require("./assignmentFileModel");
const studentModel_1 = require("./studentModel");
let File = class File extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], File.prototype, "idfile", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => studentModel_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], File.prototype, "idstudent", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => studentModel_1.Student)
], File.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => assignmentFileModel_1.AssignmentFile),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], File.prototype, "idassignmentFile", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => assignmentFileModel_1.AssignmentFile)
], File.prototype, "assignmentFile", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], File.prototype, "name_file", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], File.prototype, "path_file", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], File.prototype, "type_file", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], File.prototype, "date_file", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], File.prototype, "note_file", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        values: ['pass', 'unchecked', 'not pass'],
        defaultValue: 'unchecked',
    })
], File.prototype, "status_file", void 0);
File = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'file',
    })
], File);
exports.File = File;
