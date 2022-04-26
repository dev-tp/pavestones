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

const initialState = {
  _id: null,
  dedicated_to: '',
  is_deceased: false,
  patron: '',
  x: null,
  y: null,
};

export default function Form(props) {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    if (props.data) {
      setState(props.data);
    }
  }, [props.data, setState]);

  function onCancel(event) {
    event.stopPropagation();
    setState(initialState);
    props.onCancel();
  }

  function onSave(event) {
    event.stopPropagation();
    props.onSave(state, () => setState(initialState));
  }

  return (
    <Dialog fullWidth open={props.open}>
      <DialogTitle>
        {props.data?._id && (
          <IconButton onClick={props.onPositionEdit} size="small">
            <MoveDown />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <TextField
          autoFocus
          fullWidth
          label="Patron"
          margin="dense"
          onChange={(event) =>
            setState({ ...state, patron: event.target.value })
          }
          value={state.patron}
        />
        <TextField
          fullWidth
          label="Dedicated to"
          margin="dense"
          onChange={(event) =>
            setState({ ...state, dedicated_to: event.target.value })
          }
          value={state.dedicated_to}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.is_deceased}
                onChange={() =>
                  setState({ ...state, is_deceased: !state.is_deceased })
                }
              />
            }
            label="Deceased"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
