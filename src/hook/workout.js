import { useContext } from 'react';
import { WorkoutContext } from '../context/workout';

const useWorkout = () => useContext(WorkoutContext);

export default useWorkout;
