"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const branchModel_1 = require("./branchModel");
const sequelize_typescript_1 = require("sequelize-typescript");
const roleModel_1 = require("./roleModel");
const meetingModel_1 = require("./meetingModel");
let Teacher = class Teacher extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Teacher.prototype, "idteacher", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => roleModel_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Teacher.prototype, "idrole", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => roleModel_1.Role)
], Teacher.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => branchModel_1.Branch),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Teacher.prototype, "idbranch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => branchModel_1.Branch)
], Teacher.prototype, "branch", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Teacher.prototype, "prename_teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Teacher.prototype, "firstname_teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Teacher.prototype, "lastname_teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Teacher.prototype, "username_teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        values: ['active', 'inactive'],
        defaultValue: 'active',
    })
], Teacher.prototype, "status_teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => meetingModel_1.Meeting)
], Teacher.prototype, "meetings", void 0);
Teacher = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'teacher',
    })
], Teacher);
exports.Teacher = Teacher;
