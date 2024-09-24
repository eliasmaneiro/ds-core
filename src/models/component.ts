import moment from "moment";
import { Schema, model } from "mongoose";
import { IComponent } from "../interfaces/component.interface";

const ComponentSchema = new Schema<IComponent>({
  data: { type: Object, default: null },
  page: { type: Schema.Types.ObjectId, ref: "page" }, // para relacionarlo al archivo,
  createdAt: { type: Number, default: null },
  updatedAt: { type: Number, default: null },
});

ComponentSchema.pre("validate", async function (next) {
  const today = moment().unix();
  if (!this.createdAt) {
    this.set({ createdAt: today, updatedAt: today });
  } else {
    this.set({ updatedAt: today });
  }
  next();
});

export const ComponentModel = model("components", ComponentSchema);