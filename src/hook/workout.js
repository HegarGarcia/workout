import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { firestore } from '../service/firebase';
import useUser from './user';

function toTimestamp(date) {
  const value = moment(date, 'YYYY MM DD').toDate();
  return firebase.firestore.Timestamp.fromDate(value);
}

const useWorkout = (date) => {
  const { user } = useUser();
  const timestamp = useMemo(() => toTimestamp(date), [date]);
  const [workout, setWorkout] = useState({ date: timestamp, exercises: [] });
  const [ref, setRef] = useState();

  const workoutCollection = useMemo(
    () => firestore.collection(`user/${user.uid}/workout`),
    [user.uid]
  );

  useEffect(() => {
    const tempWorkout = {
      date: timestamp,
      exercises: []
    };

    async function fetchWorkout() {
      const query = await workoutCollection
        .where('date', '==', timestamp)
        .limit(1)
        .get();

      const localRef = query.size
        ? query.docs[0].ref
        : await workoutCollection.add(tempWorkout);

      setRef(localRef);
      localRef.onSnapshot((snap) => {
        setWorkout(snap.data());
      });
    }

    fetchWorkout();
  }, [workoutCollection, timestamp, user.uid]);

  const addExercise = useCallback(
    async (exercise) => {
      await ref.update({
        exercises: firebase.firestore.FieldValue.arrayUnion(exercise)
      });
    },
    [ref]
  );

  return { workout, addExercise };
};

export default useWorkout;
