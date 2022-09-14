"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answerfm10_18 = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const fm10_18coopModel_1 = require("./fm10_18coopModel");
const questionModel_1 = require("./questionModel");
let Answerfm10_18 = class Answerfm10_18 extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Answerfm10_18.prototype, "idanswer10_18", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => fm10_18coopModel_1.Fm10_18_coop),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'fm10_18_coop',
        },
    })
], Answerfm10_18.prototype, "idfm10_18_coop", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => fm10_18coopModel_1.Fm10_18_coop)
], Answerfm10_18.prototype, "fm10_18_coop", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => questionModel_1.Question),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Answerfm10_18.prototype, "idquestion", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => questionModel_1.Question)
], Answerfm10_18.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Answerfm10_18.prototype, "answer", void 0);
Answerfm10_18 = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'answerfm10_18',
    })
], Answerfm10_18);
exports.Answerfm10_18 = Answerfm10_18;
