"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var cors_1 = __importDefault(require("cors"));
var user_1 = __importDefault(require("./src/routes/user"));
var db_1 = __importDefault(require("./config/db"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var camp_1 = __importDefault(require("./src/routes/camp"));
var admin_1 = __importDefault(require("./src/routes/admin"));
var randomthing_1 = __importDefault(require("./src/routes/randomthing"));
var subFrontend_1 = __importDefault(require("./src/routes/subFrontend"));
(0, dotenv_1.config)({ path: './config/config.env' });
(0, db_1.default)();
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
//Body parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/randomthing', randomthing_1.default);
app.use('/admin', admin_1.default);
app.use('/subFunction', subFrontend_1.default);
app.use('/camp', camp_1.default);
app.use('/api/v1/auth', user_1.default);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, function () { return console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT); });
process.on('unhandledRejection', function (err, Promise) {
    console.log("Error: ".concat(err.message));
    server.close(function () { return process.exit(1); });
});
exports.default = app;
//console.log('jjjjjjjjjjjjjjjjjjjbutfyiknjjjjj')
