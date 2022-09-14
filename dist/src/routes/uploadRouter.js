"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = require("../controller/uploadController");
const { verifyTokenStudent } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', verifyTokenStudent, uploadController_1.uploadfile);
exports.default = router;
