"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hierarchy_controller_1 = require("./controller/hierarchy.controller");
const router = (0, express_1.Router)();
/**
 * GET /hierarchy/:id
 * Fetch a single node by its ID
 */
router.get("/hierarchy/:id", hierarchy_controller_1.getHierarchy);
/**
 * GET /hierarchy/:id/children?offset=0&limit=50
 * Fetch children for a node by parent_fk_id
 */
router.get("/hierarchy/:id/children", hierarchy_controller_1.getHierarchyChildren);
/**
 * GET /search?query=something
 * Searches by name or wnid (case-insensitive partial match)
 */
router.get("/search", hierarchy_controller_1.searchNodes);
exports.default = router;
