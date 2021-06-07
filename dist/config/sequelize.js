require("dotenv").config();
const path = require("path");
const dbPath = path.join(__dirname, "..", "..", process.env.SQL_LITE_PATH);
module.exports = {
    development: {
        storage: dbPath,
        database: "main",
        dialect: "sqlite",
        // "logging": console.log
    },
};
//# sourceMappingURL=sequelize.js.map