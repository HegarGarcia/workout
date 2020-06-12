import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { Pause, PlayArrow, Stop } from '@material-ui/icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutContext } from '../context/layout';

const useStyles = makeStyles((theme) => ({
  stop: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    '&:focus': {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText
    },
    '&:hover': {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText
    }
  },
  big: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  bigIcon: {
    fontSize: 58
  }
}));

const Wrapper = styled(Paper)`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: max-content 1fr max-content max-content;
  gap: 1rem;
  align-items: center;
  justify-items: center;

  padding: 1rem;
`;

const CronoTime = styled.div`
  font: 500 100px 'Roboto Mono';
`;

const Counter = styled.div`
  text-align: center;

  span {
    font: 500 40px Roboto;
  }
`;

const ActionsButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 3rem 0;
`;

const Cronometer = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const { setClean } = useContext(LayoutContext);
  useEffect(() => setClean(), [setClean]);
  const classes = useStyles();

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const goToHome = useCallback(() => history.push('/'), [history]);

  return (
    <Wrapper>
      <div>
        <Typography variant="subtitle1">Current exercise</Typography>
        <Typography variant="h4">Pull Ups</Typography>
      </div>
      <CronoTime>
        <span>00:50</span>
      </CronoTime>
      <Counter>
        <Typography variant="h6">Reps</Typography>
        <span>05/10</span>
      </Counter>
      <ActionsButtons>
        <Fab className={classes.stop} onClick={handleOpen}>
          <Stop />
        </Fab>
        <Fab color="primary" className={classes.big}>
          <Pause className={classes.bigIcon} />
        </Fab>
        <Fab color="secondary">
          <PlayArrow />
        </Fab>
      </ActionsButtons>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to end the workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={goToHome}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default Cronometer;
