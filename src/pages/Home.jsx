import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Add, PlayArrow, Reorder } from '@material-ui/icons';
import React, { useCallback, useReducer } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import AddExercise from '../components/AddExercise';
import DaySelector from '../components/DaySelector';
import withMainLayout from '../hoc/withMainLayout';

const formatter = new Intl.NumberFormat();
const getDateFormated = () => new Date().toDateString().substr(3, 7);

const initialState = {
  modalStatus: false,
  selectedDay: moment().startOf('day').format('YYYY MM DD'),
  exercises: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { ...state, modalStatus: true };
    case 'close':
      return { ...state, modalStatus: false };
    case 'selectDay':
      return { ...state, selectedDay: action.payload };
    case 'addExercise':
      return { ...state, exercises: [...state.exercises, action.payload] };
    default:
      return state;
  }
};

const Exercise = ({ exercise, reps }) => (
  <ListItem>
    <ListItemText
      primary={exercise}
      secondary={`${formatter.format(reps)} reps`}
    />
    <ListItemSecondaryAction>
      <Reorder />
    </ListItemSecondaryAction>
  </ListItem>
);

const formatDate = (day) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  moment().date(day).startOf('day').format('YYYY MM DD');

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`;

const FabContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = useCallback(() => dispatch({ type: 'close' }), []);
  const handleOpen = useCallback(() => dispatch({ type: 'open' }), []);
  const handleDayChange = useCallback(
    (day) => dispatch({ type: 'selectDay', payload: formatDate(day) }),
    []
  );
  const addExercise = useCallback(
    (exercise) => {
      dispatch({ type: 'addExercise', payload: exercise });
      handleClose();
    },
    [handleClose]
  );

  return (
    <StyledSection>
      <DaySelector onChange={handleDayChange} />
      <List>
        {state.exercises.map(({ exercise, reps }) => (
          <Exercise key={exercise + reps} exercise={exercise} reps={reps} />
        ))}
      </List>
      <FabContainer>
        <Fab color="secondary" aria-label="start" component={Link} to="/crono">
          <PlayArrow />
        </Fab>
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <Add />
        </Fab>
      </FabContainer>
      <AddExercise
        isOpen={state.modalStatus}
        handleClose={handleClose}
        handleSubmit={addExercise}
      />
    </StyledSection>
  );
};

export default withMainLayout({ title: getDateFormated() })(Home);
