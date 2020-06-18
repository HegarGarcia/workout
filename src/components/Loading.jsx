import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styled from 'styled-components';
import CenterWrapper from '../styles/CenterWrapper';

const Wrapper = styled(CenterWrapper)`
  justify-items: center;
  background-color: #212121;
`;

const Loading = () => (
  <Wrapper>
    <CircularProgress color="primary" />
  </Wrapper>
);

export default Loading;
