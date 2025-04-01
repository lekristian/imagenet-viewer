import { Request, Response, NextFunction } from "express";
import { ImageNetNode } from "../entities/ImageNetNode";
import { AppDataSource } from "../data-source";
import { ILike } from "typeorm";
import {
  handleGetHierarchy,
  handleGetHierarchyWithChildren,
} from "../services/hierarchy.service";

export const getHierarchy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("GET /hierarchy/:id: ", req.params.id);

    const node = await handleGetHierarchy(parseInt(req.params.id));

    if (!node) {
      return res.status(404).json({ error: "Node not found" });
    }
    return res.json({ ...node, hasChildren: node.size > 0 });
  } catch (error) {
    console.error("GET /hierarchy/:id error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getHierarchyChildren = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await handleGetHierarchyWithChildren(
      parseInt(req.params.id as string),
      parseInt(req.query.offset as string),
      parseInt(req.query.limit as string)
    );
    const resultUpdated = result.data.map((node) => ({
      ...node,
      hasChildren: node.size > 0,
    }));
    return res.json({ ...result, data: resultUpdated });
  } catch (error) {
    console.error("GET /hierarchy/:id/children error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchNodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchTerm = req.query.query as string;
    if (!searchTerm || !searchTerm.trim()) {
      return res.json([]);
    }

    const repo = AppDataSource.getRepository(ImageNetNode);

    // Using TypeORM's ILike for case-insensitive partial matching
    const results = await repo.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { wnid: ILike(`%${searchTerm}%`) },
      ],
      order: { name: "ASC" },
      take: 100,
    });

    const resultsUpdated = results.map((node) => ({
      ...node,
      hasChildren: node.size > 0,
    }));

    return res.json(resultsUpdated);
  } catch (error) {
    console.error("GET /search error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
