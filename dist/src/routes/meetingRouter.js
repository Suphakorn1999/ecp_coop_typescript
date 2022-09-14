"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meetingController_1 = require("../controller/meetingController");
const { verifyToken } = require('../middlewares/jwtHandler');
const router = (0, express_1.Router)();
router.post('/', meetingController_1.createMeeting);
router.get('/', verifyToken, meetingController_1.getMeeting);
exports.default = router;
