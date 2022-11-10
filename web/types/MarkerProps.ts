import PaveStoneProps from './PaveStoneProps';

export default interface MarkerProps {
  data: PaveStoneProps;
  insertMode?: boolean;
  onClick?: () => void;
  searchResult?: boolean;
}
