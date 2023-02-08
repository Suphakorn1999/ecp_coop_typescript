"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factoryController_1 = require("../controller/factoryController");
const { verifyToken, verifyTokenTeacher, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', verifyTokenAdmin, factoryController_1.createFactory);
router.get('/', verifyTokenAdmin, factoryController_1.getAllFactory);
exports.default = router;
