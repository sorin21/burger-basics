import React from 'react';
import Logo from "components/Logo/Logo";
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems'
import Backdrop from 'components/UI/Backdrop/Backdrop'
import Aux from 'hoc/_Aux'

import classes from './Sidedrawer.css'

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;