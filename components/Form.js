import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
