import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import RunningImg from '../assets/opening.jpeg';
import Logo from '../components/Logo';
import withCleanLayout from '../hoc/withCleanLayout';

const Container = styled.section`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 56px;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    margin: 0;
    color: white;
    font-weight: 500;
    z-index: 1;
  }
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: white;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  color: black;
  text-decoration: none;

  ${({ highlight }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    highlight &&
    css`
      background-color: #2962ff;
      color: white;
    `}
`;

const Welcome = () => (
  <Container>
    <Hero>
      <Logo size="big" />
      <span>Don&apos;t miss a day</span>
    </Hero>

    <BottomContainer>
      <Button to="signup" highlight="true">
        <span>Join</span>
      </Button>

      <Button to="login">
        <span>Log In</span>
      </Button>
    </BottomContainer>
  </Container>
);

export default withCleanLayout({ src: RunningImg })(Welcome);
