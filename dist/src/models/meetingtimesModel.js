"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meeting_Times = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const YearModel_1 = require("./YearModel");
let Meeting_Times = class Meeting_Times extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Meeting_Times.prototype, "idmeeting_times", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => YearModel_1.Year),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Meeting_Times.prototype, "idyear", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => YearModel_1.Year)
], Meeting_Times.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Meeting_Times.prototype, "times", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    })
], Meeting_Times.prototype, "start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    })
], Meeting_Times.prototype, "end_date", void 0);
Meeting_Times = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'meeting_times',
    })
], Meeting_Times);
exports.Meeting_Times = Meeting_Times;
