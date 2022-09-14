"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logoutController_1 = require("./../controller/logoutController");
const router = (0, express_1.Router)();
router.get('/', logoutController_1.logout);
exports.default = router;
