"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const provinceModel_1 = require("./provinceModel");
const qualificationModel_1 = require("./qualificationModel");
const student_companyModel_1 = require("./student_companyModel");
let Company = class Company extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Company.prototype, "idcompany", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Company.prototype, "name_company", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "name_company_eng", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => provinceModel_1.Province),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    })
], Company.prototype, "idprovince", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => provinceModel_1.Province)
], Company.prototype, "province", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "tel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "detail_company", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "number_of_employee", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "fname_manager", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "lname_manager", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "rank", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Company.prototype, "website", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        values: ['Software', 'Hardware', 'Network'],
    })
], Company.prototype, "type_company_1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        values: ['Software', 'Hardware', 'Network'],
    })
], Company.prototype, "type_company_2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        values: ['Software', 'Hardware', 'Network'],
    })
], Company.prototype, "type_company_3", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Company.prototype, "createdDate", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Company.prototype, "updatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_companyModel_1.Student_Company)
], Company.prototype, "student_company", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => qualificationModel_1.Qualification)
], Company.prototype, "qualification", void 0);
Company = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'company',
    })
], Company);
exports.Company = Company;
