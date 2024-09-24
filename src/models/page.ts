import moment from "moment";
import { Schema, model } from "mongoose";
import { IPage } from "../interfaces/page.interface";

const PageSchema = new Schema<IPage>({
  id: { type: String, default: null },
  isAsset: { type: Boolean, default: null },
  name: { type: String, default: null },
  parent: { type: String, default: null },
  removed: { type: Boolean, default: null },
  backgrounds: { type: Array, default: [] },
  exportSettings: { type: Array, default: [] },
  flowStartingPoints: { type: Array, default: [] },
  prototypeBackgrounds: { type: Array, default: [] },
  prototypeStartNode: { type: {}, default: null },
  selectedTextRange: { type: {}, default: null },
  guides: { type: Array, default: [] },
  selection: { type: Array, default: [] },
  type: { type: String, default: null },
  file: { type: Schema.Types.ObjectId, ref: "file" }, // para relacionarlo al archivo,
  createdAt: { type: Number, default: null },
  updatedAt: { type: Number, default: null },
});

PageSchema.pre("validate", async function (next) {
  const today = moment().unix();
  if (!this.createdAt) {
    this.set({ createdAt: today, updatedAt: today });
  } else {
    this.set({ updatedAt: today });
  }
  next();
});

export const PageModel = model("pages", PageSchema);
