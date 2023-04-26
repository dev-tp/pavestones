import { Pavestone } from '@prisma/client';

export type FormProps = {
  data: Pavestone;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: (data: Pavestone) => void;
  onPositionEdit: (data: Pavestone) => void;
  onSave: (data: Pavestone) => void;
};

export type MapProps = {
  children: JSX.Element;
  x?: number;
  y?: number;
  onClick: (event: React.SyntheticEvent<Element, MouseEvent>) => void;
};

export type MarkerProps = {
  data: Pavestone;
  insertMode?: boolean;
  onClick?: () => void;
  searchResult?: boolean;
};
