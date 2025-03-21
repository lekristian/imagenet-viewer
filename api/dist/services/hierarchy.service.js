"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetHierarchyWithChildren = exports.handleGetHierarchy = void 0;
const data_source_1 = require("../data-source");
const ImageNetNode_1 = require("../entities/ImageNetNode");
const handleGetHierarchy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = data_source_1.AppDataSource.getRepository(ImageNetNode_1.ImageNetNode);
    const node = yield repo.findOneBy({ id });
    return node;
});
exports.handleGetHierarchy = handleGetHierarchy;
const handleGetHierarchyWithChildren = (parent_fk_id, offset = 0, limit = 50) => __awaiter(void 0, void 0, void 0, function* () {
    offset = Number.isNaN(Number(offset)) ? 0 : Number(offset);
    limit = Number.isNaN(Number(limit)) ? 50 : Number(limit);
    const repo = data_source_1.AppDataSource.getRepository(ImageNetNode_1.ImageNetNode);
    const [rows, total] = yield repo.findAndCount({
        where: { parent_fk_id },
        order: { id: "ASC" },
        skip: offset,
        take: limit,
    });
    return {
        total,
        data: rows,
    };
});
exports.handleGetHierarchyWithChildren = handleGetHierarchyWithChildren;
