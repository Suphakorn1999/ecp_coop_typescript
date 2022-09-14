"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = void 0;
const roleModel_1 = require("../models/roleModel");
const createRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield roleModel_1.Role.findAll({
        where: { name: req.body.name }
    });
    if (role.length > 0) {
        yield roleModel_1.Role.update(Object.assign({}, req.body), { where: { name: req.body.name } });
        return res.status(200).json({ message: 'Role updated successfully' });
    }
    const roles = yield roleModel_1.Role.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'Role created successfully', data: roles });
});
exports.createRole = createRole;
