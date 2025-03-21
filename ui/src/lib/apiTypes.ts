export interface HierarchyNode {
  id: string;
  name: string;
  wnid: string;
  size: number;
  hasChildren: boolean;
}

export interface SearchResult extends HierarchyNode {
  path: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
