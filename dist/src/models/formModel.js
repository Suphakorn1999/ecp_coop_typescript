"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const questionModel_1 = require("./questionModel");
let Form = class Form extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Form.prototype, "idform", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Form.prototype, "name_form", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        values: ['active', 'inactive'],
        defaultValue: 'active'
    })
], Form.prototype, "status_form", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => questionModel_1.Question)
], Form.prototype, "questions", void 0);
Form = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'form',
    })
], Form);
exports.Form = Form;
