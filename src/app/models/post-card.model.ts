import { Item } from './item.model';

export interface PostCardItem {
  id: string;
  customTitle: string;
  title: string;
  summary: string;
  hasMore: boolean;
  url: string | null;
  isExternalPost: boolean;
  author: string;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: Item[];
  createdDate: Date;
}
