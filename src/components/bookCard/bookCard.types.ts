export interface bookCardPropsType {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  selected: boolean;
  size: "small" | "large";
  deleteButtonEnable: boolean;
  actionCallback: () => void;
}
