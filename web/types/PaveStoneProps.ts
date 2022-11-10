import Point from './Point';

export default interface PaveStoneProps {
  _id?: number;
  patron?: string;
  dedicated_to?: string;
  is_deceased?: boolean;
  coordinate?: Point;
}
