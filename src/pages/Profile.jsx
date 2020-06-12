import {
  Avatar,
  Button,
  Divider,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImg from '../assets/profile.jpg';
import { AuthContext } from '../context/auth';
import { LayoutContext } from '../context/layout';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18)
  }
}));

const Wrapper = styled.section`
  width: 100%;
  height: 100%;

  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: max-content 1fr max-content;
  gap: 1rem;
  padding: 1rem;
`;

const StyledList = styled.ul`
  align-self: flex-start;
  width: 100%;
  margin: 0;
  list-style-type: none;
  padding: 0;

  li {
    height: 64px;
    padding: 0 1rem;

    span {
      max-height: 24px;
    }

    h6 {
      max-height: 20px;
    }
  }
`;

const Profile = () => {
  const history = useHistory();
  const { setMain } = useContext(LayoutContext);
  const { logout } = useContext(AuthContext);

  const signout = useCallback(() => {
    logout();
    history.push('/welcome');
  }, [history, logout]);

  useEffect(() => {
    setMain({ title: 'Profile' });
  }, [setMain]);

  const classes = useStyles();

  return (
    <Wrapper>
      <Avatar src={ProfileImg} className={classes.large} />
      <StyledList>
        <li>
          <Typography variant="overline">Name</Typography>
          <Typography variant="subtitle1">Ritthy Hoffman</Typography>
        </li>
        <Divider />
        <li>
          <Typography variant="overline">Email</Typography>
          <Typography variant="subtitle1">
            ritthy.hoffman@example.com
          </Typography>
        </li>
        <Divider />
        <li>
          <Typography variant="overline">Gender</Typography>
          <Typography variant="subtitle1">Male</Typography>
        </li>
      </StyledList>
      <Button onClick={signout}>Sign out</Button>
    </Wrapper>
  );
};

export default Profile;
