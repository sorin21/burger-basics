import React, { Component } from 'react'
import Aux from 'hoc/_Aux';
import classes from './Layout.css'
import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'



class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  drawerToggleClicked = () => {
    this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }))
  }

  render() {
    return (
      <Aux>
        <div>
          <Toolbar clicked={this.drawerToggleClicked} />
          <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>)
  }
}


export default Layout;