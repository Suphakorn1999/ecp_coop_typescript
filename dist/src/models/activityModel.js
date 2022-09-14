"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const activity_studentModel_1 = require("./activity_studentModel");
let Activity = class Activity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Activity.prototype, "idactivity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Activity.prototype, "name_activity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 'active',
        values: ['active', 'inactive']
    })
], Activity.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => activity_studentModel_1.Activity_Student)
], Activity.prototype, "activity_students", void 0);
Activity = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'activity',
    })
], Activity);
exports.Activity = Activity;
