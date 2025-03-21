import { AppDataSource } from "../data-source";
import { ImageNetNode } from "../entities/ImageNetNode";

export const handleGetHierarchy = async (id: number) => {
  const repo = AppDataSource.getRepository(ImageNetNode);

  const node = await repo.findOneBy({ id });

  return node;
};

export const handleGetHierarchyWithChildren = async (
  parent_fk_id: number,
  offset: number = 0,
  limit: number = 50
) => {
  offset = Number.isNaN(Number(offset)) ? 0 : Number(offset);
  limit = Number.isNaN(Number(limit)) ? 50 : Number(limit);

  const repo = AppDataSource.getRepository(ImageNetNode);

  const [rows, total] = await repo.findAndCount({
    where: { parent_fk_id },
    order: { id: "ASC" },
    skip: offset,
    take: limit,
  });

  return {
    total,
    data: rows,
  };
};
