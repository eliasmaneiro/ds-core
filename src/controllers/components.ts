import { Request, Response } from "express";
import { GB } from "../globalfunctions";
import { PageModel } from "../models/page";
import { ComponentModel } from "../models/component";

class ComponentController {
  async save(req:Request, res:Response): Promise<Response> {
    GB.checkConnectionAndConnect;
    const { data } = req.body;
    const page = await PageModel.findOne(
      { id: data.parent },
      { _id: 1 }
    ).lean();

    let set:any = {
      data,
    };

    if (page) {
      set.page = page;
    }

    const component = await ComponentModel.findOneAndUpdate(
      { "data.id": data.id },
      { $set: set },
      { upsert: true, new: true, returnNewDocument: true, lean: true }
    );

    return res.status(200).json({
      msg: `success`,
      component,
    });
  }
}

export default new ComponentController();