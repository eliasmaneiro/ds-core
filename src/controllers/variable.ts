import { Request, Response } from "express";
import { GB } from "../globalfunctions";
import { FileModel } from "../models/file";
import { VariableModel } from "../models/variable";
import { IVariable } from "../interfaces/variable.interface";

interface IFile {
  name: String,
  child: IFile[],
};

class VariableController {
  async save(req:Request, res:Response): Promise<Response> {
    GB.checkConnectionAndConnect;
    const { variables, file } = req.body;

    // to update
    let fileReg;

    if (file) {
      fileReg = await FileModel.findOne({ id: file }, { _id: 1 }).lean();
    }

    const variableFind = await VariableModel.find(
      {
        id: {
          $in: variables.map((e:IVariable) => e.id),
        },
      },
      { id: 1 }
    ).lean();

    const toUpdateFind:String[] = variableFind.map((e: any) => e.id);

    const toUpdate = [];
    const toInsert = [];
    for (let i = 0; i < variables.length; i++) {
      const e = variables[i];
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
      await VariableModel.updateOne({ id: e.id }, e);
    }

    // to insert
    await VariableModel.insertMany(toInsert);
    return res.status(200).json({
      msg: `${variables.length} saved`,
      updates: toUpdate.length,
      new: toInsert.length,
    });
  }

  async buildDs() {
    const variables = await VariableModel.find({}).lean();
    const colors = variables.filter((e: any) => /colors/gi.test(e.name));
    if(colors?.length){
      this.buildColors(colors);
    }
    // const typeface = variables.filter((e) => /typeface/gi.test(e.name));
    return true;
  }
  
  buildColors(data: IVariable[]) {
    const file:IFile[] = [];
    if(data && Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const e:any = data[i];
        const level = e.name.toLowerCase().replace(' ','-').replace("[\]",'').split('/');
        console.log(level);
        for (let j = 0; j < level.length; j++) {
          const ee = level[j];
          console.log('levelname', ee);
          const fatherFileExist = file.findIndex((k) => k.name == ee[0]);
          if(fatherFileExist != -1) {
            if(i == 0) {
              file.push({
                name: ee,
                child: []
              })
            } else {
              // const jsonCoords = this.verifyHierachy(file[fatherFileExist], ee);
              
            }
          }
          console.log('iteration level break');
          break;
        }
        console.log('iteration data break');
        break;
      }
    }
  }

  // verifyHierachy(file:IFile, name:String, jsonCoords?:String):String|undefined {
  //   // entra y verifica si el nombre existe
  //   if(file.name == name) {
  //     // si existe, agregaré
  //     return `[child]`;
  //   } else if(file.child) {
  //     for (let i = 0; i < file.child.length; i++) {
  //       const e = file.child[i];
  //       if(e.name == name) {
  //         return `[child][${i}]`;
  //       } else {
  //         if(!jsonCoords) {
  //           jsonCoords = '';
  //         }
  //         jsonCoords+=`[child][${i}]`;
  //         if(file) {
  //           // file
  //         }
  //         return this.verifyHierachy(e,name,jsonCoords);
  //       }
  //     }
  //   }
  //   return jsonCoords;
  // }
}

export default new VariableController();
