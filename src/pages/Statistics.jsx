import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import withMainLayout from '../hoc/withMainLayout';

const StyledSection = styled.section`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content;

  align-content: center;
  justify-content: center;
`;
const Statistics = () => (
  <StyledSection>
    <Typography variant="h1" align="center">
      Coming soon!
    </Typography>
  </StyledSection>
);

export default withMainLayout({ title: 'Statistics' })(Statistics);
