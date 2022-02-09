import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function Form(props) {
  return (
    <Dialog
      fullWidth
      onCancel={props.onCancel}
      onSave={props.onSave}
      open={props.open}
    >
      <DialogContent />
      <DialogActions>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={props.onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
