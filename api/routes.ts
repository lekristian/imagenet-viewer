import { Router } from "express";

import {
  getHierarchy,
  getHierarchyChildren,
  searchNodes,
} from "./controller/hierarchy.controller";

const router = Router();

/**
 * GET /hierarchy/:id
 * Fetch a single node by its ID
 */
router.get("/hierarchy/:id", getHierarchy);

/**
 * GET /hierarchy/:id/children?offset=0&limit=50
 * Fetch children for a node by parent_fk_id
 */
router.get("/hierarchy/:id/children", getHierarchyChildren);

/**
 * GET /search?query=something
 * Searches by name or wnid (case-insensitive partial match)
 */
router.get("/search", searchNodes);

export default router;
