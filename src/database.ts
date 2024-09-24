import { connect } from "mongoose";
import * as dotenv from "dotenv";
import moment from "moment";

dotenv.config();

class Database {
  constructor() {
    this.connectToDatabase();
  }

  async connectToDatabase(): Promise<void> {
    const dbUser = encodeURIComponent(process.env.DDB_USER || "");
    const dbPwd = encodeURIComponent(process.env.DDB_PASSWORD || "");
    let dbAuthString = "";

    if (dbUser !== "" && typeof dbUser === "string") {
      dbAuthString = `${dbUser}:${dbPwd}@`;
    }

    const connectString = `mongodb://${dbAuthString}${encodeURIComponent(
      process.env.DDB_HOST || ""
    )}:${encodeURIComponent(process.env.DDB_PORT || "")}/${encodeURIComponent(
      process.env.DDB_NAME || ""
    )}`;

    await connect(connectString)
      .then(() => {
        console.log("Connected successfully to the database");
      })
      .catch((error) => {
        console.error(`${moment().toISOString()} - Database Connection.`);
        console.error(error);
        process.exit(500);
      });
  };
}

export const DB = new Database();

