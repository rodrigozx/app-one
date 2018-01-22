
/*    Este INDEX es donde se inicia la applicación
    - Se importan las rutas
    - Se crea el STORE
    - Se Contiene el componente principal (que contiene los otros)
*/

//libs react
import React from 'react';
import ReactDOM from 'react-dom';

// Para manejo de state y store
import { Provider } from 'react-redux';
import { store } from './helpers';

//Manejo de eventos
import injectTapEventPlugin from 'react-tap-event-plugin';

//Recarga de la app ante cambios
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';

//Style
// import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

//Definicion de las rutas
import App from './containers/App';
import LoginPage  from './containers/LoginPage';
import WorkWith  from './containers/WorkWith';
import CustomForms from './containers/CustomForms';
import Dashboard  from './containers/Dashboard';
import Formulario  from './containers/Formulario';
import NotFoundPage  from './components/NotFoundPage';
import evoForm  from './components/evoForm';

injectTapEventPlugin();

//Constante para injectar en div root
const container = document.getElementById('root');


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App >
                <Switch>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/workwith" component={WorkWith}/>
                    <Route path="/formulario" component={Formulario}/>
                    <Route path='/evoform' component={evoForm}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </App >
        </Router>
    </Provider>
    ,container);

registerServiceWorker();


