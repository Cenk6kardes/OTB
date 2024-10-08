export interface Item {
  id: string;
  title: string;
  count: number | null;
  orderNo: number;
  isDeleted: boolean | null;
}

export interface SelectableItem extends Item {
  selected: boolean;
}
