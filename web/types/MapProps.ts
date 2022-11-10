import Point from './Point';

export default interface MapProps {
  children: JSX.Element;
  coordinate?: Point;
  onClick: (event: React.SyntheticEvent<Element, MouseEvent>) => void;
}
