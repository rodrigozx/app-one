import React from 'react';
import { Component } from 'react';
import JsonTable from 'react-json-table';
import Form from 'react-schema-form';
import SkyLight from 'react-skylight';//libreria para mostrar ventanas modales http://marcio.github.io/react-skylight/
import axios from "axios";

const queryString = require('query-string');

class evoForm extends Component{
    constructor(props){
        super(props);
        this.state = {formData: {}, action: "INS", estado: "Initializing"};
        this.form = {schema: {}, uiSchema: {}, metaData: {}};

        const queryString = require('query-string');
        const parsed = queryString.parse(props.location.search);
        this.frmName = parsed.frm;
        this.uriSchema = 'http://nublit-iis-net.eastus2.cloudapp.azure.com/api/AllSchemas/MergedSchemas?formName=frm'+this.frmName.toUpperCase();
        this.uriData   = 'http://nublit-iis-net.eastus2.cloudapp.azure.com/api/select';
        this.uriSubmit = 'http://localhost:3043/api/'+this.frmName.toUpperCase()+'/';
        this.uriToken = "Bearer 2ADD3_-y0GkziB6SMvs_gQtQl2GAbkvpXFVBI5Ya_oF3MwNT3gssw4r-UHBBKcMp4rvMccg__8RXs1Llo_kUmdmYFLC5v5BGr4Y6uhka924lEIdwpsUcxke13MdwsPx94NmLklOjG0LMRUWHKX5FwQ-ynRJjzV2D2qEnqrvwGQXwZze1kcWUOTNzuUC8a1_BUgwwLH2fPXmhvx3OjDGDhcNhb8GiyxzN6VtKjf82H6H5Ml2UZbhA9cFSrPyLpIagtQ54u5U8eL7SfzlN07tZEED4lA_KA58k9V-i44LI-rtQ0vAyWGMbkoARg9k2qbTJULJSSuI3B5dAWGyh6BhRS0tQ4d2pnFY_dZIBOoJVEqDs90bCL3TzzEO1QxYK1tGcZTnPTWtaoI726aaSqS2ayXWZZr-jzwi9JOct3dpvGMVr4JCrS7wW5WM5HHkIqr06q1XGek1srlCd8SPrkj9BPWV-1JaSdfMtIR3TxUnDAww";

        this.onBlurCallApi = this.onBlurCallApi.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onBlurCallApi(e){
        var attribute = e.substring(5,e.length);
        var uri;
        state = this.state;
        state.estado = 'Blured';
        this.setState(this.state);        
        if (this.form.metaData[attribute]){
            var mdAttribute = this.form.metaData[attribute];
            if (mdAttribute.apiToCall){ //Tengo definido una acción
        var params = [];
        var key, value, arrKeys = [];
        var state; //por blur.
                //Si el atributo del blur es clave, entonces tengo q hacer el get del CRUD.
                //Sino es un get con parámetros de filtro.
                //cargo los parámetros
                if (mdAttribute.params)  {
                    for (var i in mdAttribute.params){
                        key = mdAttribute.params[i];
                        value = this.state.formData[mdAttribute.params[i]];
                        params.push({key: value});
                        if (mdAttribute.isKey){
                            arrKeys.push(value);
                        }
                    }
                    //Hago la invocación a la API
                    
                }
                if (mdAttribute.isKey){
                    //Hago la invocación a la API
                    uri = mdAttribute.apiToCall + arrKeys.join('/');
                }else{  //Es solo un parámetro así que lo invoco en sintaxis restfull  .. uri/parametro
                    uri = mdAttribute.apiToCall + '?'+ queryString.stringify(params);    
                }  
                console.log('armo la uri xa get.. ' + uri);  
                state.estado = 'Getting...';
                this.setState(state);
                var axiosOptions = {
                    method: 'GET',
                    url: uri,
                    headers: {
                        "Authorization": this.uriToken,
                        "Access-Control-Allow-Origin": '*'
                        }
                    };
        
                axios(axiosOptions)
                .then  ( response => {
                    var state = this.state;
                    state.formData = response.data;
                    if (response.data[attribute] === this.state.formData[attribute]){
                        //Quiere decir que trajo datos. Esto habría que consultar por el statuscode del response 
                        //que sería más lógico que el estado que se devuelve en la API ya diga si trajo datos o no...
                        state.action = 'UPD';
                    }else{
                        state.action = 'INS';
                    }
                    state.estado = 'Ended'
                    this.setState(state)
                })
                .catch ( function (error){
                    console.log('Error en get de onblur');
                    console.log(error);
                })    
            }
        }
    }
   
    onFormSubmit(event){ 
        console.log('en submit event es ');
        console.log(event);
        var axiosOptions = {} , state = this.state;
        state.estado = 'Submitting...';
        this.setState(state);
          //var stringbody = JSON.stringify(this.state.formData);
//          console.log('llamo a la uri ' + this.uriSubmit);
        console.log(this.form.metaData);
        var arrKeys = [];
        //cargo los parámetros
        for (var i in this.form.metaData){
            if (this.form.metaData[i].isKey){
                arrKeys.push(this.state.formData[i]);
            }
        }
        switch(this.state.action){
            case 'UPD': {
                console.log('entor por upd');
                axiosOptions = {
                    url: this.uriSubmit + arrKeys.join('/'),
                    data: this.state.formData,
                    method: 'PUT',
                    headers: {
                        Authorization: this.uriToken,
                        "Access-Control-Allow-Origin": '*'
                    }
                };
                break;
            }
            case 'DLT': {
                axiosOptions = {
                    url: this.uriSubmit + '/' + arrKeys.join('/'),
                    method: 'DELETE',
                    headers: {
                        Authorization: this.uriToken,
                        "Access-Control-Allow-Origin": '*'
                    }
                };                    
                break;
            }
            case 'INS': {
                axiosOptions = {
                    url: this.uriSubmit,
                    data: this.state.formData,
                    method: 'POST',
                    headers: {
                        Authorization: this.uriToken,
                        "Access-Control-Allow-Origin": '*'
                    }
                };                    
                break;
            }
        }
        console.log('llamo con method ' + axiosOptions.method);
        axios(axiosOptions)
            .then  ( response => {
                console.log('entro a response');
                console.log(response);
                var state = this.state;
                state.estado = 'Submited.'
                this.setState(state)
            })
            .catch ( function (error){
                console.log('catch error en on form submit');
                console.log(error);
            });
    }
   
    onInputChange(event){ 
        this.setState({ formData: event.formData});
    }

    componentWillMount(){
        var state = this.state;
        state.estado = 'Fetching';
        this.setState(state);
        var uri = this.uriSchema;
        var axiosOptions = {
            url: this.uriSchema,
            method: 'GET',
            headers: {
                "Authorization": this.uriToken,
                "Access-Control-Allow-Origin": '*'
            }
        };
        console.log(axiosOptions);
        axios(axiosOptions)
            .then  ( response => {
                this.evoCreateForm(response.data)            
            })
            .catch ( function (error){
                console.log(error);
            })
        //  fetch(uri)
        //    .then( (response) => response.json())
        //    .then ( (response) => this.createWebPanel(response))
        //    .catch( (response) => console.log(response))
    }

    evoCreateForm(evoSchema){
        //console.log(evoSchema);
        var state = this.state
        this.form.schema = evoSchema.schema;
        this.form.uischema = evoSchema.uischema;
        state.formData = evoSchema.formdata;
 
//        var jsonSchemaGenerator = require('json-schema-generator');     
//        this.form.schema = jsonSchemaGenerator(evoSchema.formdata);

        this.form.metaData = {
            "BCSId": {
                apiToCall: 'http://nublit-iis-net.eastus2.cloudapp.azure.com:81/api/BCOSEG/',
                params: ["BCSId"],   
                isKey: true
            }

        }
        state.estado = 'Loaded ' + this.webPanelName;

        this.setState(state);
        console.log('Create');
        console.log(this.state);
        console.log('======');  
    }
    //Función para personlalizar en columnas.
    template(props) {
        const {id, label, required, children} = props;
        return (
          <div className="attrForm">
            <label htmlFor={id}>{label}{required ? "*" : null}</label>
            {children}
          </div>
        );
      }  
//--------------------------------------------
    render() {
        return (
            <div>
                <span>Estado: {this.state.estado}</span><span>ACTION: {this.state.action}</span>
               <div className="form col-lg-8 col-md-4">
                  <div className="form-group col-lg-8 col-md-4">
                    
                    <Form
                        //schema, uiSchema, formData, FieldTemplate === son propiedades del componente Form
                        schema={this.form.schema}
                        uiSchema={this.form.uiSchema}
                        formData={this.state.formData}
                        FieldTemplate={this.template}
                        onBlur={x => this.onBlurCallApi(x)}
                        onChange={this.onInputChange}
                        onSubmit={this.onFormSubmit}
                      >
                      <div>   
                        <button className="btn btn-primary btn-lg active btnSubForm" name="Confirmar" type="submit">Confirmar</button>
                        <button className="btn btn-secondary btn-lg active btnSubForm" name="Cancelar" type="submit">Cancelar</button>
                      </div>
                    
                    </Form >
                    
                  </div>
              </div>
            </div>
            );
        }
}

export default evoForm;