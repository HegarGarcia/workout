import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import DaySelector from '../components/DaySelector';
import withMainLayout from '../hoc/withMainLayout';

const StyledSection = styled.section`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: max-content max-content 1fr;
  gap: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 0 1rem;
`;

const useStyles = makeStyles({
  title: {
    fontSize: 14
  },
  card: {
    width: '100%'
  }
});

const Statistics = () => {
  const classes = useStyles();

  return (
    <StyledSection>
      <DaySelector onChange={() => {}} />
      <StatsContainer>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Workouts
            </Typography>
            <Typography variant="h5" component="h2">
              1
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Time
            </Typography>
            <Typography variant="h5" component="h2">
              30 min
            </Typography>
          </CardContent>
        </Card>
      </StatsContainer>
    </StyledSection>
  );
};

export default withMainLayout({ title: 'Statistics' })(Statistics);
