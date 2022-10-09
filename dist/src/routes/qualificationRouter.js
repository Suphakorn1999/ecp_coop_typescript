"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qualificationController_1 = require("../controller/qualificationController");
const { verifyToken } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', verifyToken, qualificationController_1.createQualification);
router.put('/', verifyToken, qualificationController_1.updateQualification);
exports.default = router;
