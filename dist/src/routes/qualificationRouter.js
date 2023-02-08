"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qualificationController_1 = require("../controller/qualificationController");
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', verifyTokenAdmin, qualificationController_1.createQualification);
router.put('/', verifyTokenAdmin, qualificationController_1.updateQualification);
exports.default = router;
