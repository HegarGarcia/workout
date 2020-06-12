import React, { memo } from 'react';
import Logo from '../components/Logo';
import Wrapper from '../styles/Wrapper';

const AuthLayout = memo(({ children }) => (
  <Wrapper>
    <main>{children}</main>
    <footer>
      <Logo />
    </footer>
  </Wrapper>
));

export default AuthLayout;
