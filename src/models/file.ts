import moment from "moment";
import { Schema, model } from "mongoose";
import { IFile } from "../interfaces/file.interface";

const FileSchema = new Schema<IFile>({
  id: { type: String, default: null },
  documentColorProfile: { type: String, default: null },
  isAsset: { type: Boolean, default: null },
  name: { type: String, default: null },
  parent: { type: String, default: null },
  removed: { type: Boolean, default: null },
  type: { type: String, default: null },
  createdAt: { type: Number, default: null },
  updatedAt: { type: Number, default: null },
});

// VariableSchema.pre("findOneAndUpdate", async function (next) {
//   const today = moment().unix();
//   const oldDoc = await this.model
//     .findOne(this.getQuery(), { createdAt: 1, updatedAt: 1 })
//     .lean();
//   if (oldDoc) {
//     if (!oldDoc.createdAt) {
//       this.set({ createdAt: today, updatedAt: today });
//     } else {
//       this.set({ updatedAt: today });
//     }
//   } else {
//     this.set({ createdAt: today, updatedAt: today });
//   }
//   next();
// });

FileSchema.pre("validate", async function (next) {
  const today = moment().unix();
  if (!this.createdAt) {
    this.set({ createdAt: today, updatedAt: today });
  } else {
    this.set({ updatedAt: today });
  }
  next();
});

export const FileModel = model("files", FileSchema);
