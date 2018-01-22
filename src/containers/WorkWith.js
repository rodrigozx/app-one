import React from 'react';
import {Link} from 'react-router-dom';

//libs material ui
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';

//componente ppagina base..
import PageBase from '../components/PageBase';

//style
import styles from '../styles/workWith';

const WorkWith = () => {

  return (
    <PageBase title="Formulario"
              navigation="Application / Formulario">
      <form>

        <TextField
          hintText="Nombre"
          floatingLabelText="Nombre"
          fullWidth={true}
        />

        <SelectField
          floatingLabelText="Ciudad"
          value=""
          fullWidth={true}>
          <MenuItem key={0} primaryText="London"/>
          <MenuItem key={1} primaryText="Paris"/>
          <MenuItem key={2} primaryText="Rome"/>
        </SelectField>

        <DatePicker
          hintText="Fecha Vencimimento"
          floatingLabelText="Fecha Vencimimento"
          fullWidth={true}/>

        <div style={styles.toggleDiv}>
          <Toggle
            label="Deshabilitado"
            labelStyle={styles.toggleLabel}
          />
        </div>

        <Divider/>

        <div style={styles.buttons}>
          <Link to="/">
            <RaisedButton label="Cancelar"/>
          </Link>

          <RaisedButton label="Guardad"
                        style={styles.saveButton}
                        type="submit"
                        primary={true}/>
        </div>
      </form>
    </PageBase>
  );
};

export default WorkWith;
