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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.login = exports.getUserFromToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const user_1 = __importDefault(require("../models/user"));
const cryptPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
const comparePassword = (plainPass, hash) => {
    const flag = bcrypt_1.default.compareSync(plainPass, hash);
    return flag;
};
const getUserFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
    if (!!decoded) {
        let expired = moment_1.default().diff(moment_1.default(decoded.expiry, "x"), "days") > 0;
        if (expired) {
            throw new Error("Auth token expired please renew it.");
        }
        let user = yield user_1.default.findByPk(decoded.uid);
        if (user === null)
            throw new Error("Invalid Authorization token");
        return user;
    }
    else {
        throw new Error("Invalid Authorization token");
    }
});
exports.getUserFromToken = getUserFromToken;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { email: data.email } });
    console.log("🚀 ~ file: auth.ts ~ line 43 ~ login ~ user", user);
    if (user === null)
        throw new Error("User not found with provided email.");
    const isPasswordMatch = comparePassword(data.password, user.password);
    if (isPasswordMatch === false)
        throw new Error("Incorrect password.");
    const expiry = moment_1.default().add(process.env.TOKEN_EXPIRY, "days").format("x");
    const token = jsonwebtoken_1.default.sign({ uid: user.id, expiry }, process.env.JWT_SECRET);
    return {
        user,
        token,
    };
});
exports.login = login;
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const encPass = cryptPassword(data.password.toString());
    const [user, created] = yield user_1.default.findOrCreate({
        where: { email: data.email },
        defaults: {
            first_name: data.firstName,
            last_name: data.lastName,
            type: "user",
        },
    });
    if (!created) {
        throw new Error(`User with ${data.email} email exist.`);
    }
    user.password = encPass;
    yield user.save();
    const expiry = moment_1.default().add(process.env.TOKEN_EXPIRY, "day").format("x");
    const token = jsonwebtoken_1.default.sign({ uid: user.id, expiry }, process.env.JWT_SECRET);
    return {
        user,
        token,
    };
});
exports.registerUser = registerUser;
//# sourceMappingURL=auth.js.map