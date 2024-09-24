import { Request, Response } from "express";
import { GB } from "../globalfunctions";
import { FileModel } from "../models/file";
import { PageModel } from "../models/page";

class PageController {
  async save(req:Request, res: Response): Promise<Response> {
    GB.checkConnectionAndConnect;
    const { pages, file } = req.body;

    // to update
    let fileReg;

    if (file) {
      fileReg = await FileModel.findOne({ id: file }, { _id: 1 }).lean();
    }

    const pageFind = await PageModel.find(
      {
        id: {
          $in: pages.map((e:any) => e.id),
        },
      },
      { id: 1 }
    ).lean();

    const toUpdateFind:String[] = pageFind.map((e: any) => e.id);

    const toUpdate = [];
    const toInsert = [];
    for (let i = 0; i < pages.length; i++) {
      const e = pages[i];
      if (fileReg && !e.remote) {
        e.file = fileReg._id;
      }
      if (toUpdateFind.includes(e.id)) {
        toUpdate.push(e);
      } else {
        toInsert.push(e);
      }
    }

    for (let i = 0; i < toUpdate.length; i++) {
      const e = toUpdate[i];
      await PageModel.updateOne({ id: e.id }, e);
    }

    // to insert
    await PageModel.insertMany(toInsert);
    return res.status(200).json({
      msg: `${pages.length} saved`,
      updates: toUpdate.length,
      new: toInsert.length,
    });
  }

  async saveOne(req: Request, res: Response): Promise<Response> {
    GB.checkConnectionAndConnect;

    const { page } = req.body;

    if (!page) {
      return res.status(422).json({
        msg: "Param page not found",
      });
    }

    const { file } = page;

    let fileReg;

    if (file) {
      fileReg = await FileModel.findOne({ id: file }, { _id: 1 }).lean();
    }

    if (!fileReg) {
      return res.status(404).json({
        msg: "Not found",
        Errors: [
          {
            msg: "file not found",
          },
        ],
      });
    }

    page.file = fileReg._id;

    const savedPage = await PageModel.findOneAndUpdate(
      { id: page.id },
      { $set: page },
      { upsert: true, new: true, returnNewDocument: true, lean: true }
    );

    // to insert
    return res.status(200).json({
      msg: "success",
      page: savedPage,
    });
  }
}

export default new PageController();
