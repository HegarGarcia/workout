import Paper from '@material-ui/core/Paper';
import React, { memo } from 'react';
import styled from 'styled-components';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';

const Background = styled(Paper)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr minmax(0, 56px);
`;

const MainLayout = memo(({ children, title }) => (
  <Background elevation={0}>
    <Header title={title} showBack={false} />
    <main>{children}</main>
    <BottomNavigation />
  </Background>
));

export default MainLayout;
