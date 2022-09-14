"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const downloadController_1 = require("../controller/downloadController");
const router = (0, express_1.Router)();
router.get('/', downloadController_1.downloadFile);
exports.default = router;
