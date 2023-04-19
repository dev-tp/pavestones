export interface FormProps {
  data: PaveStoneProps;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: (data: PaveStoneProps) => void;
  onPositionEdit: (data: PaveStoneProps) => void;
  onSave: (data: PaveStoneProps) => void;
}

export interface MapProps {
  children: JSX.Element;
  coordinate?: Point;
  onClick: (event: React.SyntheticEvent<Element, MouseEvent>) => void;
}

export interface MarkerProps {
  data: PaveStoneProps;
  insertMode?: boolean;
  onClick?: () => void;
  searchResult?: boolean;
}

export interface PaveStoneProps {
  _id?: number;
  patron?: string;
  dedicated_to?: string;
  is_deceased?: boolean;
  coordinate?: Point;
}

export interface Point {
  x: number;
  y: number;
}
