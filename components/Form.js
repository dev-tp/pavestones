import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import MoveDown from '@mui/icons-material/MoveDown';
import React from 'react';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

export default function Form(props) {
  const dedicatedTo = React.createRef();
  const isDeceased = React.createRef();
  const patron = React.createRef();

  function getCurrentData() {
    return {
      ...props.data,
      dedicated_to: dedicatedTo.current?.value,
      is_deceased: isDeceased.current?.checked,
      patron: patron.current?.value,
    };
  }

  function submit(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      props.onSave(getCurrentData());
    }
  }

  return (
    <Dialog fullWidth onKeyUp={submit} open={props.open}>
      <DialogTitle>
        {props.data?._id && (
          <IconButton
            onClick={() => props.onPositionEdit(getCurrentData())}
            size="small"
          >
            <MoveDown />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <TextField
          autoFocus
          defaultValue={props.data?.patron}
          fullWidth
          inputRef={patron}
          label="Patron"
          margin="dense"
        />
        <TextField
          defaultValue={props.data?.dedicated_to}
          fullWidth
          inputRef={dedicatedTo}
          label="Dedicated to"
          margin="dense"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={props.data?.is_deceased}
                inputRef={isDeceased}
              />
            }
            label="Deceased"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={() => props.onSave(getCurrentData())}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
