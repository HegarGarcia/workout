import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Reorder } from '@material-ui/icons';
import React, { memo } from 'react';

const formatter = new Intl.NumberFormat();

function Exercise({ exercise }) {
  return (
    <ListItem>
      <ListItemText
        primary={exercise.name}
        secondary={`${formatter.format(exercise.reps)} reps`}
      />
      <ListItemSecondaryAction>
        <Reorder />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default memo(Exercise);
