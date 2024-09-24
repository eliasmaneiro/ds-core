import { connection, ConnectionStates } from "mongoose";
import fs, { PathLike } from "fs";
import { DB } from "./database";
class GlobalFunctionsController {
  checkConectionToDatabase(): ConnectionStates {
    const status = connection.readyState;
    return status;
  }

  checkConnectionAndConnect(): void {
    const dbStatus = this.checkConectionToDatabase();
    if (!dbStatus) {
      DB.connectToDatabase;
    }
  }

  timeout(ms: number): Promise<any> {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setValueInObject(obj:{}, path:string, value:any) {
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
    if(pathArray) {
      pathArray?.reduce((acc, key, i) => {
        if (acc[key] === undefined) acc[key] = {};
        if (i === pathArray?.length - 1) acc[key] = value;
        return acc[key];
      }, obj);
    }
  };

  generateFile(path: PathLike, filename: String, extension: String, content: string | NodeJS.ArrayBufferView) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }
    return fs.writeFileSync(`${path}/${filename}.${extension}`, content);
  }

  readFile(path: PathLike) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  }
}

export const GB = new GlobalFunctionsController();
