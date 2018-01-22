// import { authWorkWithHeader } from '../helpers';
// import axios from 'axios';

// //listo las funciones accesibles
// export const workWithService = {
//     getWorkWith
// };

// function getWorkWith(workWithName) {
//     let name = workWithName.toUpperCase();
//     //la url del backend
//     const uriSchema = `http://nublit-iis-net.eastus2.cloudapp.azure.com/api/allSchemas?formName=frm${name}`;

//     //las opciones para hacer el request
//     const requestOptions = {
//         url: uriSchema,
//         method: 'GET',
//         headers: authWorkWithHeader()
//     };

//     //hago el request y retorno lo que da la funcion handle
//     return axios(requestOptions).then(handleResponse);
// }

// function handleResponse(response) {

//     if (!response.statusText=='OK') { 
//         return (response);
//     }
//     return (response.data);

// }