/*
  El header contiene:
    + el state y el boton de la haburguesa para cerar y abrir el menu
    + la barra para buscar
    + el botón de aplicaciones
    + el botón de opciones
*/

import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';
import SearchBox from '../components/SearchBox';

//style exclusivo del header
import { style } from '../styles/header';

class Header extends React.Component {

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={
              <SearchBox />
              }
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><ViewModule color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem key={1} primaryText="Sitio Oficial" containerElement={<Link to="http://www.cousa.com" target="_blank"/>} />
                    <MenuItem key={2} primaryText="Office 365" containerElement={<Link to="http://portal.office.com" target="_blank"/>} />
                    <MenuItem key={3} primaryText="Nublit" containerElement={<Link to="http://www.nublit.com" target="_blank"/>} />
                  </IconMenu>
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Opciones" containerElement={<Link to="/Options"/>}/>
                    <MenuItem primaryText="Cambiar Contraseña" containerElement={<Link to="/resetpassword"/>}/>
                    <MenuItem primaryText="Cerrar Sesión" containerElement={<Link to="/login"/>}/>
                  </IconMenu>
                </div>
              }
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
