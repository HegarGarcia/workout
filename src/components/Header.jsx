import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ArrowBack } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appbar: {
    background: grey[900]
  }
}));

const Header = ({ title, showBack = true }) => {
  const classes = useStyles();
  const history = useHistory();
  const goBack = useCallback(() => history.goBack(), [history]);

  return (
    <AppBar
      position="relative"
      color="primary"
      classes={{
        colorPrimary: classes.appbar
      }}
    >
      <Toolbar>
        {showBack && (
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            onClick={goBack}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
