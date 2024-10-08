import { Item } from './item.model';

//TODO - Need to modified according to real data
export interface IPostDetailItem {
    id: string;
    user: Item;
    customTitle: string;
    title: string;
    content: string;
    summary: string;
    postLevelList: null;
    postStatusList: null;
    status: Item;
    level: Item;
    tags: Item[];
    categories: Item[];
    url?: string;
    isLikedByUser: boolean;
    isBookmarkedByUser: boolean;
}
