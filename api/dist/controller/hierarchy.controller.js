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
exports.searchNodes = exports.getHierarchyChildren = exports.getHierarchy = void 0;
const ImageNetNode_1 = require("../entities/ImageNetNode");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
const hierarchy_service_1 = require("../services/hierarchy.service");
const getHierarchy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("GET /hierarchy/:id: ", req.params.id);
        const node = yield (0, hierarchy_service_1.handleGetHierarchy)(parseInt(req.params.id));
        if (!node) {
            return res.status(404).json({ error: "Node not found" });
        }
        return res.json(Object.assign(Object.assign({}, node), { hasChildren: node.size > 0 }));
    }
    catch (error) {
        console.error("GET /hierarchy/:id error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getHierarchy = getHierarchy;
const getHierarchyChildren = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, hierarchy_service_1.handleGetHierarchyWithChildren)(parseInt(req.params.id), parseInt(req.query.offset), parseInt(req.query.limit));
        return res.json(result);
    }
    catch (error) {
        console.error("GET /hierarchy/:id/children error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getHierarchyChildren = getHierarchyChildren;
const searchNodes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.query;
        if (!searchTerm || !searchTerm.trim()) {
            return res.json([]);
        }
        const repo = data_source_1.AppDataSource.getRepository(ImageNetNode_1.ImageNetNode);
        // Using TypeORM's ILike for case-insensitive partial matching
        const results = yield repo.find({
            where: [
                { name: (0, typeorm_1.ILike)(`%${searchTerm}%`) },
                { wnid: (0, typeorm_1.ILike)(`%${searchTerm}%`) },
            ],
            order: { name: "ASC" },
            take: 100,
        });
        return res.json(results);
    }
    catch (error) {
        console.error("GET /search error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.searchNodes = searchNodes;
