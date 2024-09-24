import { Schema } from "mongoose";
import { ModelBase } from "./model-base.interface";

export interface IComponent extends ModelBase {
    data: any | null,
    page: Schema.Types.ObjectId
}