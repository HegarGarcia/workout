import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Pause,
  PlayArrow,
  Stop
} from '@material-ui/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import withCleanLayout from '../hoc/withCleanLayout';
import useTimer from '../hook/timer';

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

const RepsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const Counter = styled.div`
  grid-column: 2/3;
  text-align: center;

  span {
    font: 500 40px Roboto;
  }
`;

const ActionsButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: space-evenly;
  gap: 0.5rem;
  padding: 3rem 0;
`;

const Cronometer = () => {
  const history = useHistory();
  useEffect(() => {
    if (history.location.state.exercises.length === 0) {
      history.push('/');
    }
  }, [history]);
  const { state: workout } = history.location;

  const [index, setIndex] = useState(0);
  const currentExercise = useMemo(() => workout.exercises[index], [
    index,
    workout
  ]);

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { time, play, pause, isCounting } = useTimer();
  const handleOpen = useCallback(() => {
    pause();
    setIsOpen(true);
  }, [pause]);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const goToHome = useCallback(() => history.push('/'), [history]);
  const prevExercise = useCallback(() => setIndex(index - 1), [index]);
  const nextExercise = useCallback(() => setIndex(index + 1), [index]);

  return (
    <Wrapper>
      <div>
        <Typography align="center" variant="subtitle1">
          Current exercise
        </Typography>
        <Typography variant="h4">{currentExercise.name}</Typography>
      </div>
      <CronoTime>
        <span>{time}</span>
      </CronoTime>
      <RepsWrapper>
        <IconButton disabled={index === 0} onClick={prevExercise}>
          <KeyboardArrowLeft fontSize="large" />
        </IconButton>
        <Counter>
          <Typography variant="h6">Reps</Typography>
          <span>{currentExercise.reps}</span>
        </Counter>
        <IconButton
          disabled={index + 1 === workout.exercises.length}
          onClick={nextExercise}
        >
          <KeyboardArrowRight fontSize="large" />
        </IconButton>
      </RepsWrapper>
      <ActionsButtons>
        <Fab className={`${classes.stop} ${classes.big}`} onClick={handleOpen}>
          <Stop className={classes.bigIcon} />
        </Fab>
        {isCounting ? (
          <Fab color="primary" onClick={pause} className={classes.big}>
            <Pause className={classes.bigIcon} />
          </Fab>
        ) : (
          <Fab color="secondary" onClick={play} className={classes.big}>
            <PlayArrow className={classes.bigIcon} />
          </Fab>
        )}
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

export default withCleanLayout()(Cronometer);
