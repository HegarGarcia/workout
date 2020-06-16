import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Pause, PlayArrow, Stop } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import withCleanLayout from '../hoc/withCleanLayout';

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

export default withCleanLayout()(Cronometer);
