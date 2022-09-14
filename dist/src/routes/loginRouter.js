"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controller/loginController");
const router = (0, express_1.Router)();
router.get('/', loginController_1.login);
exports.default = router;
