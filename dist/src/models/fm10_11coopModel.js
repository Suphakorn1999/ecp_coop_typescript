"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fm10_11_coop = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const answer10_11Model_1 = require("./answer10_11Model");
const student_companyModel_1 = require("./student_companyModel");
let Fm10_11_coop = class Fm10_11_coop extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Fm10_11_coop.prototype, "idfm10_11_coop", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_companyModel_1.Student_Company),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'student_company',
        },
    })
], Fm10_11_coop.prototype, "idstudent_company", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_companyModel_1.Student_Company)
], Fm10_11_coop.prototype, "student_company", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_11_coop.prototype, "time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_11_coop.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Fm10_11_coop.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answer10_11Model_1.Answerfm10_11)
], Fm10_11_coop.prototype, "answerfm10_11", void 0);
Fm10_11_coop = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'fm10_11_coop',
    })
], Fm10_11_coop);
exports.Fm10_11_coop = Fm10_11_coop;
