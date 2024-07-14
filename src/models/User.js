"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buf = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.buf = process.env.JWT_SECECRET || 'asdfjkl;;lkjfdsa';
var UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    lastname: {
        type: String,
        required: [true, 'Please add a lastname']
    },
    nickname: {
        type: String,
        required: [true, 'Please add a nickname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        Math: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    tel: {
        type: String,
        unique: true,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    studentId: {
        type: String,
        default: null,
        unique: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    shertSize: {
        type: String,
        required: [true, 'Plese choose shert size'],
        enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL']
    },
    helthIsueId: {
        type: mongoose_1.default.Schema.ObjectId,
        default: null
    },
    haveBottle: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        enum: ['nong', 'pee'],
        default: 'nong'
    },
    nongCampIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeCampIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoCampIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    group: {
        type: String,
        enum: ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', null],
        default: null
    },
    role: {
        type: String,
        enum: ['pee', 'nong', 'admin', 'peto'],
        default: 'nong'
    },
    filterIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    registerIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    authorizeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    fridayActIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    fridayActEn: {
        type: Boolean,
        default: false
    },
    fridayAuth: {
        type: Boolean,
        default: false
    },
    likeSongIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    shertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    lostAndFoundIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    linkHash: {
        type: String,
        default: 'null'
    },
    citizenId: {
        type: String
    },
    likeToSleepAtCamp: {
        type: Boolean,
        required: [true]
    },
    authPartIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    choiseAnswerIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    quasionIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    selectOffsetId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    displayOffsetId: {
        type: mongoose_1.default.Schema.ObjectId
    }
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    _a = this;
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, salt)];
                case 2:
                    _a.password = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = mongoose_1.default.model('User', UserSchema);
