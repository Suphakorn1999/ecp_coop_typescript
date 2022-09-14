"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factoryController_1 = require("../controller/factoryController");
const router = (0, express_1.Router)();
router.post('/', factoryController_1.createFactory);
router.get('/', factoryController_1.getAllFactory);
exports.default = router;
