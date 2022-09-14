"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pointFm10_20Controller_1 = require("../controller/pointFm10_20Controller");
const router = (0, express_1.Router)();
router.get('/detail', pointFm10_20Controller_1.getFm10_20detail);
router.get('/coop', pointFm10_20Controller_1.getFm10_20coop);
router.get('/question', pointFm10_20Controller_1.getquestionfm10_20);
exports.default = router;
