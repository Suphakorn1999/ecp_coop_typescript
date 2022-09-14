"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fm10_20_coop = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const answer10_20Model_1 = require("./answer10_20Model");
const meetingModel_1 = require("./meetingModel");
let Fm10_20_coop = class Fm10_20_coop extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Fm10_20_coop.prototype, "idfm10_20_coop", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => meetingModel_1.Meeting),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'meeting',
        },
    })
], Fm10_20_coop.prototype, "idmeeting", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => meetingModel_1.Meeting)
], Fm10_20_coop.prototype, "meeting", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_20_coop.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_20_coop.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answer10_20Model_1.Answerfm10_20)
], Fm10_20_coop.prototype, "answerfm10_20", void 0);
Fm10_20_coop = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'fm10_20_coop',
    })
], Fm10_20_coop);
exports.Fm10_20_coop = Fm10_20_coop;
