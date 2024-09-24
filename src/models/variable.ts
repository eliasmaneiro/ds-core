import moment from "moment";
import { Schema, model } from "mongoose";
import { IVariable } from "../interfaces/variable.interface";

const VariableSchema = new Schema<IVariable>({
  id: { type: String, default: null },
  description: { type: String, default: null },
  key: { type: String, default: null },
  name: { type: String, default: null },
  remote: { type: Boolean, default: false },
  resolvedType: { type: String, default: null },
  scoped: [],
  valuesByMode: { type: Object, default: null },
  variableCollectionId: { type: String, default: null },
  file: { type: Schema.Types.ObjectId, ref: "file" }, // para relacionarlo al archivo,
  createdAt: { type: Number, default: null },
  updatedAt: { type: Number, default: null },
});

VariableSchema.pre("validate", async function (next) {
  const today = moment().unix();
  if (!this.createdAt) {
    this.set({ createdAt: today, updatedAt: today });
  } else {
    this.set({ updatedAt: today });
  }
  next();
});

export const VariableModel = model("variables", VariableSchema);
