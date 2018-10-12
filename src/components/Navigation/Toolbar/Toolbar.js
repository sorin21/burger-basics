import React from 'react';
import classes from './Toolbar.css';
import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return (
    <div>
      <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
           <NavigationItems></NavigationItems>
        </nav>
      </header>
    </div>
  );
};

export default Toolbar;