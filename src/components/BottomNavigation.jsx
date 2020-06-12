import Navigation from '@material-ui/core/BottomNavigation';
import NavigationAction from '@material-ui/core/BottomNavigationAction';
import { FitnessCenter, InsertChart, Person } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

const BottomNavigation = () => {
  const history = useHistory();
  const [route, setRoute] = useState(history.location.pathname);
  const onChange = useCallback(
    (_, newRoute) => {
      setRoute(newRoute);
      history.push(newRoute);
    },
    [history]
  );

  return (
    <Navigation value={route} onChange={onChange}>
      <NavigationAction value="/" label="Workout" icon={<FitnessCenter />} />
      <NavigationAction
        value="/stats"
        label="Statistics"
        icon={<InsertChart />}
      />
      <NavigationAction value="/profile" label="Profile" icon={<Person />} />
    </Navigation>
  );
};

export default BottomNavigation;
