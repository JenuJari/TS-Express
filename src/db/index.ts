import { Sequelize } from "sequelize";
import sequelize from "./../config/sequelize";

class DbConnection {
  private _connection: any;
  constructor() {
    console.log("Sqlite connection initiation started.",sequelize.development.storage);
    this._connection = new Sequelize({
      dialect: "sqlite",
      storage: sequelize.development.storage,
    });
  }

  getConnection = () => this._connection;

  testConn = async () => {
    try {
      await this._connection.authenticate();
      console.log("Connection has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  };
}

export default new DbConnection();
