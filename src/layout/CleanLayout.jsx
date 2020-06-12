import React, { memo } from 'react';
import styled from 'styled-components';

const Container = styled.main`
  height: 100%;
  width: 100%;
`;

const CleanLayout = memo(({ children }) => <Container>{children}</Container>);

export default CleanLayout;
