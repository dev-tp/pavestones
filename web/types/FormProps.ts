import PaveStoneProps from './PaveStoneProps';

export default interface FormProps {
  data: PaveStoneProps;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: (data: PaveStoneProps) => void;
  onPositionEdit: (data: PaveStoneProps) => void;
  onSave: (data: PaveStoneProps) => void;
}
