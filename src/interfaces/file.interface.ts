import { ModelBase } from "./model-base.interface";

export interface IFile extends ModelBase {
    documentColorProfile: String | null,
    isAsset: Boolean | null,
    name: String | null,
    parent: String | null,
    removed:  Boolean | null,
    type: String | null,
}