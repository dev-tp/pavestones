import { Pavestone } from '@prisma/client';

export interface FormProps {
  data: Pavestone;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: (data: Pavestone) => void;
  onPositionEdit: (data: Pavestone) => void;
  onSave: (data: Pavestone) => void;
}

export interface MapProps {
  children: JSX.Element;
  x?: number;
  y?: number;
  onClick: (event: React.SyntheticEvent<Element, MouseEvent>) => void;
}

export interface MarkerProps {
  data: Pavestone;
  insertMode?: boolean;
  onClick?: () => void;
  searchResult?: boolean;
}
