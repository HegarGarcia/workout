import React, { memo } from 'react';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Wrapper from '../styles/Wrapper';

const AuthFormLayout = memo(({ children, title }) => (
  <Wrapper>
    <Header title={title} />
    <main>{children}</main>
    <footer>
      <Logo />
    </footer>
  </Wrapper>
));

export default AuthFormLayout;
