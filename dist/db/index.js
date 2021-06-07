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
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./../config/sequelize"));
class DbConnection {
    constructor() {
        this.getConnection = () => this._connection;
        this.testConn = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._connection.authenticate();
                console.log("Connection has been established successfully.");
            }
            catch (err) {
                console.error("Unable to connect to the database:", err);
            }
        });
        console.log("Sqlite connection initiation started.", sequelize_2.default.development.storage);
        this._connection = new sequelize_1.Sequelize({
            dialect: "sqlite",
            storage: sequelize_2.default.development.storage,
        });
    }
}
exports.default = new DbConnection();
//# sourceMappingURL=index.js.map