import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Close } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 1rem;
  align-content: flex-start;
`;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: grey[900]
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const AddExercise = ({ isOpen, handleClose, handleSubmit }) => {
  const classes = useStyles();
  const [exercise, setExercise] = useState('');
  const handleSelect = useCallback(
    (event) => setExercise(event.target.value),
    []
  );
  const [reps, setReps] = useState();
  const onChange = (event) => setReps(+event.target.value);

  const submit = useCallback(() => handleSubmit({ exercise, reps }), [
    exercise,
    reps,
    handleSubmit
  ]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add Exercise
          </Typography>
          <Button color="inherit" onClick={submit}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <FormControl fullWidth variant="filled">
          <InputLabel id="gender">Exercise</InputLabel>
          <Select
            value={exercise}
            onChange={handleSelect}
            labelId="gender"
            label="Gender"
            fullWidth
          >
            <MenuItem value="Push Ups">Push Ups</MenuItem>
            <MenuItem value="Pull Ups">Pull Ups</MenuItem>
            <MenuItem value="Squads">Squads</MenuItem>
            <MenuItem value="Burpees">Burpees</MenuItem>
            <MenuItem value="Mountain Climber">Mountain Climber</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="filled"
          label="Reps"
          type="number"
          onChange={onChange}
        />
      </Wrapper>
    </Dialog>
  );
};

export default AddExercise;
