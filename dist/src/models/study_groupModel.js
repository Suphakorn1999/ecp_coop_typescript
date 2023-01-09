"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Study_group = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const studentModel_1 = require("./studentModel");
let Study_group = class Study_group extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Study_group.prototype, "idstudy_group", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    })
], Study_group.prototype, "name_study_group", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => studentModel_1.Student)
], Study_group.prototype, "students", void 0);
Study_group = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'study_group',
    })
], Study_group);
exports.Study_group = Study_group;
