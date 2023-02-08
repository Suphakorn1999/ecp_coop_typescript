"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provinceController_1 = require("../controller/provinceController");
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', verifyTokenAdmin, provinceController_1.createProvince);
router.get('/', provinceController_1.getAllProvince);
exports.default = router;
