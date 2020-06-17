import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import { Add, PlayArrow } from '@material-ui/icons';
import React, { useCallback, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddExercise from '../components/AddExercise';
import DaySelector from '../components/DaySelector';
import Exercise from '../components/Exercise';
import withMainLayout from '../hoc/withMainLayout';
import useWorkout from '../hook/workout';
import { getToday } from '../utils/date';

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
  const [selectedDay, setSelectedDay] = useState(getToday());
  const [isModalOpen, setIsModelOpen] = useState(false);
  const { workout, addExercise } = useWorkout(selectedDay);

  const openModal = useCallback(() => setIsModelOpen(true), []);
  const closeModal = useCallback(() => setIsModelOpen(false), []);
  const onDayChange = useCallback((event) => {
    const { date } = event.target.closest('[data-date]').dataset;
    setSelectedDay(date);
  }, []);
  const onExerciseAdd = useCallback(
    async ({ exercise, reps }) => {
      await addExercise({ name: exercise, reps });
      closeModal();
    },
    [addExercise, closeModal]
  );

  const ExerciseList = useMemo(() => {
    const { exercises } = workout;
    return exercises.map((exercise, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Exercise key={index} exercise={exercise} />
    ));
  }, [workout]);

  return (
    <StyledSection>
      <DaySelector value={selectedDay} onChange={onDayChange} />
      <List>{ExerciseList}</List>
      <FabContainer>
        <Fab color="secondary" aria-label="start" component={Link} to="/crono">
          <PlayArrow />
        </Fab>
        <Fab color="primary" aria-label="add" onClick={openModal}>
          <Add />
        </Fab>
      </FabContainer>
      <AddExercise
        isOpen={isModalOpen}
        handleClose={closeModal}
        handleSubmit={onExerciseAdd}
      />
    </StyledSection>
  );
};

export default withMainLayout({ title: 'Exercises' })(Home);
