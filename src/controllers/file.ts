import { Request, Response } from "express";
import { FileModel } from "../models/file";
import { GB } from "../globalfunctions";

class FileController {
  async save(req:Request, res:Response): Promise<Response> {
    GB.checkConnectionAndConnect;
    const { file } = req.body;
    await FileModel.findOneAndUpdate(
      { id: file.id, name: file.name },
      { $set: file },
      { upsert: true, lean: true, new: true }
    );
    return res.status(200).json({
      msg: "file saved",
    });
  }
}

export default new FileController();
