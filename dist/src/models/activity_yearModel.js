"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity_Year = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const activityModel_1 = require("./activityModel");
const YearModel_1 = require("./YearModel");
let Activity_Year = class Activity_Year extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Activity_Year.prototype, "idactivity_year", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => activityModel_1.Activity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Activity_Year.prototype, "idactivity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => activityModel_1.Activity)
], Activity_Year.prototype, "activity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => YearModel_1.Year),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Activity_Year.prototype, "idyear", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => YearModel_1.Year)
], Activity_Year.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 'active',
        values: ['active', 'inactive'],
    })
], Activity_Year.prototype, "status_activity_year", void 0);
Activity_Year = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'activity_year',
    })
], Activity_Year);
exports.Activity_Year = Activity_Year;
