"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pointFm10_21Controller_1 = require("../controller/pointFm10_21Controller");
const router = (0, express_1.Router)();
router.get('/coop', pointFm10_21Controller_1.getFm10_21coop);
router.get('/detail', pointFm10_21Controller_1.getFm10_21detail);
exports.default = router;
