/*
  Este componente contiene:
  - header
  - LeftDrawer => que es el menu izquierdo
  - div contenedor => que tiene lo que se muestra de la aplicación

  ... me traigo "data" por defecto para renderizar el menu,
    ésto en realidad se carga según el usuario... "Data.menus"

*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../styles/theme-default';
import Data from '../data';

//Componente Header y Menu izquierdo
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      user: {firstname:'Papa', lastname: 'Topo', job:'Admin'}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        firstname={this.state.user.firstname}
                        lastname={ this.state.user.lastname}
                        job={ this.state.user.job}/>

            <div style={styles.container}>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
