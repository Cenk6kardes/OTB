import { Item } from './item.model';
import { IPostLevel, IPostStatus } from './post-level-status.model';

export interface IPost {
  id?: string;
  customTitle: string;
  title: string;
  content: string;
  summary: string;
  postStatusId: string | null;
  postLevelId: string | null;
  tags?: string[];
  categories: string[];
  url?: string;
}

export interface IFromUrl {
  summary: string;
  title: string;
  url: string;
}

export interface IForEdit {
  content: string;
  customTitle: string;
  id: string;
  level: IPostLevel;
  postLevelList: IPostLevel[];
  status: IPostStatus;
  postStatusList: IPostStatus[];
  summary: string;
  tags: Item[];
  categories: Item[];
  title: string;
  url: string;
  userId: string;
  pageId: string;
}

export interface IForProfilePost {
  postId: string;
  pageTitle: string;
  tags: Item[];
  username: string;
  categories: Item[];
  title: string;
}
