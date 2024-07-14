"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var subFrontend_1 = require("../controllers/subFrontend");
var router = express_1.default.Router();
router.post('/adminBypass/', auth_1.protect, subFrontend_1.adminBypass);
router.post('/peeBypass/', auth_1.protect, subFrontend_1.peeBypass);
router.post('/nongBypass/', auth_1.protect, subFrontend_1.nongBypass);
router.post('/petoBypass/', auth_1.protect, subFrontend_1.petoBypass);
exports.default = router;
