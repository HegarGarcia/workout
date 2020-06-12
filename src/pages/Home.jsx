import { Fab, ListItemSecondaryAction } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Add, PlayArrow, Reorder } from '@material-ui/icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddExercise from '../components/AddExercise';
import DaySelector from '../components/DaySelector';
import { LayoutContext } from '../context/layout';

const formatter = new Intl.NumberFormat();

const getDateFormated = () => new Date().toDateString().substr(3, 7);

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
  const { setMain } = useContext(LayoutContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    setMain({ title: getDateFormated() });
  }, [setMain]);

  const exercises = [
    { name: 'Pullups', reps: 69420 },
    { name: 'Squads', reps: 30 },
    { name: 'Pushups', reps: 40 }
  ];

  return (
    <StyledSection>
      <DaySelector />
      <List>
        {exercises.map(({ name, reps }) => (
          <Exercise key={name + reps} exercise={name} reps={reps} />
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
      <AddExercise isOpen={isOpen} handleClose={handleClose} />
    </StyledSection>
  );
};

export default Home;
