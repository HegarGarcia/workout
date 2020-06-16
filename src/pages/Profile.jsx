import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import withMainLayout from '../hoc/withMainLayout';
import useUser from '../hook/user';
import { signOut } from '../service/auth';

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
  const classes = useStyles();
  const { user } = useUser();

  return (
    <Wrapper>
      <Avatar src={user.photoURL} className={classes.large} />
      <StyledList>
        <li>
          <Typography variant="overline">Name</Typography>
          <Typography variant="subtitle1">{user.name}</Typography>
        </li>
        <Divider />
        <li>
          <Typography variant="overline">Email</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </li>
        <Divider />
        <li>
          <Typography variant="overline">Gender</Typography>
          <Typography variant="subtitle1">
            {user.gender.toUpperCase()}
          </Typography>
        </li>
      </StyledList>
      <Button onClick={signOut}>Sign out</Button>
    </Wrapper>
  );
};

export default withMainLayout({ title: 'Profile' })(Profile);
