"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pointFm10_18Controller_1 = require("../controller/pointFm10_18Controller");
const router = (0, express_1.Router)();
router.get('/question', pointFm10_18Controller_1.getquestion10_18);
router.get('/detail', pointFm10_18Controller_1.getFm10_18detail);
router.get('/coop', pointFm10_18Controller_1.getFm10_18coop);
exports.default = router;
