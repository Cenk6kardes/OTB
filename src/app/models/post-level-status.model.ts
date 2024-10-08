import { Item } from './item.model';

export interface ILevelStatus {
  content: string | null;
  customTitle: string | null;
  id: string;
  level: string;
  postLevelList: IPostLevel[];
  status: string;
  postStatusList: IPostStatus[];
  summary: string | null;
  tags: Item | null;
  title: string | null;
  url: string | null;
  userId: string;
}

export interface IPostLevel {
  count: number;
  id: string;
  isDeleted: boolean | null;
  orderNo: boolean | null;
  title: string;
}

export interface IPostStatus {
  count: number;
  id: string;
  isDeleted: boolean | null;
  orderNo: boolean | null;
  title: string;
}
