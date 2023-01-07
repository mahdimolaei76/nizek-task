export interface bookType {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  selected: boolean;
  size: "small" | "large";
  deleteButtonEnable: boolean;
  actionCallback: () => void;
}

export interface categoryType {
  id: string;
  title: string;
  booksList: bookType[];
}
