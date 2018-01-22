import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
      backgroundImage:'url(' + require('../images/LOGO-COPALHA-WHT.png') + ')',
      backgroundSize: '90%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage:  'url(' + require('../images/material_bg4.jpg') + ')',
        height: 60
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 2,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      },
      lastname: {
        paddingTop: 1,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      },
      job:{
        paddingTop: 1,
        display: 'block',
        color: 'gray',
        fontWeight: 50,
        textShadow: '1px 1px #444'
      }

    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.logo}></div>
        <div style={styles.avatar.div}>
          
          {/* Imagen del usuario */}
          <Avatar src="http://www.asiap.org/AsIAP/images/JIAP/JIAP2015/Conferencistas/vartabedian.png"
                  size={60}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.firstname}</span>
          <span style={styles.avatar.lastname}>{props.lastname}</span>
          <span style={styles.avatar.job}>{props.job}</span>
        </div>
        
        <div>
          
          {/* Dibuja los menu que vienen en las PROPS */}
          {props.menus.map((menu, index) =>
            
            // Cada item del menu tiene sus propiedades distintas que vienen en el json
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  job: PropTypes.string
};

export default LeftDrawer;
