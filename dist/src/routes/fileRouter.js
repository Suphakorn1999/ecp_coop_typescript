"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../controller/fileController");
const { verifyTokenStudent } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.get('/', verifyTokenStudent, fileController_1.getFile);
router.delete('/', verifyTokenStudent, fileController_1.deleteFile);
exports.default = router;
