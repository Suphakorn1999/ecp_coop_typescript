"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fm10_21_coop = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const answer10_21Model_1 = require("./answer10_21Model");
const studentModel_1 = require("./studentModel");
let Fm10_21_coop = class Fm10_21_coop extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Fm10_21_coop.prototype, "idfm10_21_coop", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => studentModel_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'student',
        },
    })
], Fm10_21_coop.prototype, "idstudent", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => studentModel_1.Student)
], Fm10_21_coop.prototype, "qualification", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_21_coop.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_21_coop.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answer10_21Model_1.Answerfm10_21)
], Fm10_21_coop.prototype, "answers", void 0);
Fm10_21_coop = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'fm10_21_coop',
    })
], Fm10_21_coop);
exports.Fm10_21_coop = Fm10_21_coop;
