"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yearController_1 = require("../controller/yearController");
const router = (0, express_1.Router)();
router.post('/', yearController_1.createYear);
router.get('/', yearController_1.getAllYear);
exports.default = router;
