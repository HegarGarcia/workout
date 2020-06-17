import React, { createContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';
import { firestore } from '../service/firebase';
import useUser from '../hook/user';

export const WorkoutContext = createContext({
  workout: {},
  async getDayWorkout(day) {
    return Promise.resolve(day);
  }
});

const getTimestamp = (day) => {
  const date = moment(day, 'YYYY MM DD').toDate();
  return firebase.firestore.Timestamp.fromDate(date);
};

const WorkoutProvider = ({ children }) => {
  const { user } = useUser();
  const [workout, setWorkout] = useState({});

  const workoutCollection =
    user.uid && firestore.collection(`user/${user.uid}/workout`);

  const getDayWorkout = async (day) => {
    const timestamp = getTimestamp(day);
    const ref = workoutCollection.doc(timestamp.toMillis().toString());
    const doc = await ref.get();

    if (!doc.exists) {
      await ref.set({ day: timestamp });
    }

    const data = (await ref.get()).data();
    setWorkout(data);
  };

  return (
    <WorkoutContext.Provider value={{ workout, getDayWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
