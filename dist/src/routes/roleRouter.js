"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controller/roleController");
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', verifyTokenAdmin, roleController_1.createRole);
exports.default = router;
