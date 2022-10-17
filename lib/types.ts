export type Post = {
  id: string;
  title: string;
  tags: Tag[];
  description: string;
  isHidden: boolean;
  date: string;
};

export type Tag = {
  id: string;
  name: string;
  color: NotionColorsTypes;
};

export type Frontmatter = {
  title: string;
  description: string;
};

export type NotionColorsTypes =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
