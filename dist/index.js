"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require('dotenv').config();
require('source-map-support').install();
process.on('unhandledRejection', console.log);
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const auth_1 = require("./repo/auth");
/* routes imports */
const auth_2 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const webRoot_1 = __importDefault(require("./routes/webRoot"));
const app = express_1.default();
const port = 5000;
/* initial configs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/apis', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield auth_1.getUserFromToken(req.headers.authorization);
        if (user && user.id) {
            app.set("user", user);
            next();
        }
    }
    catch (e) {
        return http_errors_1.default(503, e.message);
    }
}));
app.use('/', webRoot_1.default);
app.use('/api/auth', auth_2.default);
app.use('/apis/user', user_1.default);
/* unhandled routes */
app.use(function (_, __, next) {
    next(http_errors_1.default(404));
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // await dbConn.testConn();
    // await dbConn.getConnection().sync();
    console.log(`Example app listening at http://localhost:${port}`);
}));
//# sourceMappingURL=index.js.map