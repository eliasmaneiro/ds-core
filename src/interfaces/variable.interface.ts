import { Schema } from "mongoose";
import { ModelBase } from "./model-base.interface";

export interface IVariable extends ModelBase{
    description: String | null,
    key:  String | null,
    name:  String | null,
    remote: { type: Boolean, default: false },
    resolvedType:  String | null,
    scoped: [],
    valuesByMode: any | null,
    variableCollectionId:  String | null,
    file: Schema.Types.ObjectId | String, // para relacionarlo al archivo,
  }