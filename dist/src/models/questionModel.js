"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Question_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const answer10_20Model_1 = require("./answer10_20Model");
const answerModel_1 = require("./answerModel");
const formModel_1 = require("./formModel");
let Question = Question_1 = class Question extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], Question.prototype, "idquestion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => formModel_1.Form),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Question.prototype, "idform", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => formModel_1.Form)
], Question.prototype, "form", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Question_1),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    })
], Question.prototype, "idsub_question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Question.prototype, "name_question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Question.prototype, "detail_question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        values: ['yes', 'no'],
    })
], Question.prototype, "count_question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        values: ['active', 'inactive'],
        defaultValue: 'active',
    })
], Question.prototype, "status_question", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answerModel_1.Answerfm10_14)
], Question.prototype, "answers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answer10_20Model_1.Answerfm10_20)
], Question.prototype, "answers10_20", void 0);
Question = Question_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'question',
    })
], Question);
exports.Question = Question;
