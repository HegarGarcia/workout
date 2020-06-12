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

const AddExercise = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [exercise, setExercise] = useState('');
  const handleSelect = useCallback(
    (event) => setExercise(event.target.value),
    []
  );

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
          <Button color="inherit" onClick={handleClose}>
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
            <MenuItem value="pushups">Push Ups</MenuItem>
            <MenuItem value="pullups">Pull Ups</MenuItem>
            <MenuItem value="squads">Squads</MenuItem>
            <MenuItem value="burpees">Burpees</MenuItem>
            <MenuItem value="mountain climber">Mountain Climber</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth variant="filled" label="Reps" />
      </Wrapper>
    </Dialog>
  );
};

export default AddExercise;
