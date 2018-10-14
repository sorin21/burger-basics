import React from 'react';
import classes from './Toolbar.css';
import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
  return (
    <div>
      <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.clicked} />
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
           <NavigationItems />
        </nav>
      </header>
    </div>
  );
};

export default Toolbar;