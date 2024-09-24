import { Schema } from "mongoose";
import { ModelBase } from "./model-base.interface";

export interface IPage extends ModelBase {
    isAsset: Boolean | null,
    name: String | null,
    parent: String | null,
    removed: Boolean | null,
    backgrounds: [] | null,
    exportSettings: [] | null,
    flowStartingPoints: [] | null,
    prototypeBackgrounds: [] | null,
    prototypeStartNode: {} | null,
    selectedTextRange: {} | null,
    guides: [] | null,
    selection: [] | null,
    type: String | null,
    file: Schema.Types.ObjectId
}