import React from 'react';
import PropTypes from 'prop-types';
import { logOut, drawerStatusChange } from 'actions';
import Logo from 'components/Logo';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const CONFIG = require('../../../config.json');

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    'z-index': 999999
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClickLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(logOut());
  };

  handleMenuClick = e => {
    const { dispatch, draweropened } = this.props;
    let flag = draweropened;
    if(flag)
      flag = false;
    else
      flag = true;
    dispatch(drawerStatusChange(flag));
  };

  render() {

    const { classes, draweropened } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => this.handleMenuClick()}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {CONFIG.appname}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);