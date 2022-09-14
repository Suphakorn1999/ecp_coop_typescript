"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const branchModel_1 = require("./branchModel");
let Factory = class Factory extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Factory.prototype, "idfactory", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Factory.prototype, "name_factory", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => branchModel_1.Branch)
], Factory.prototype, "branches", void 0);
Factory = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'factory',
    })
], Factory);
exports.Factory = Factory;
