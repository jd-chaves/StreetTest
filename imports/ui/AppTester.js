
import React, { Component } from 'react';
import ProyectoTester from "./ProyectoTester.js";
import {mount} from "react-mounter";
import HistorialTester from "./historialTester"

//-----------Actualización de Meteor ----------------
import { withTracker } from "meteor/react-meteor-data";

//collection
import { Proyectos } from "../api/proyectos.js";
//---------------------------------------------------

export class AppTester extends Component {
    
    ingreseCuentaAlert(){
      swal("Ingresa ya!", "Debes ingresar a tu cuenta para realizar esta acción", "error");
      FlowRouter.go("/");

    }
        
    irHistorial(){
        // mount(HistorialTester)
      Meteor.user() ?
      FlowRouter.go("/HistorialTester")
      :  this.ingreseCuentaAlert();
    }

    renderProyectos(){

      let proyectosProbados = this.props.proyectos;

      return proyectosProbados.map((proyecto)=>{
                return <ProyectoTester 
                key={proyecto._id}
                proyecto={proyecto}
                />
                })
    }

    render() {
      if(!Meteor.user()) this.ingreseCuentaAlert();
        return (
        <div className="testerdiv">

            <div className="container">
            <div className="jumbotron">
             <h1 className="display-4" >¡A calificar proyectos!</h1>
             <p className="lead">En esta sección puedes encontrar los proyectos existentes en la plataforma para calificar y ganar puntos.</p>
             <hr className="my-4"/>
             <p>
              Si deseas calificar algún proyecto, solo debes presionar el boton Test y completar el formulario que te aparecerá allí.
              Los puntos dependeran del autor del proyecto, debes esperar a que él apruebe tu contibución.
             </p>
            <p className="lead"> Aquí puedes ver el acumulado de tus puntos. 
                <span> </span>
                <button id="historial" className="btn btn-info" onClick={this.irHistorial.bind(this)} >Historial</button>
            </p>
            </div>
            </div>

            <div className="container">
            {
              this.renderProyectos()
            }
            </div>




        </div>
        );
    }
}

export default withTracker(()=>{
  //Se suscribe a la publicación de proyectos
  Meteor.subscribe("proyectosNoUsuario");

  return {
    proyectos: Proyectos.find({}, {sort: {createdAt: -1}}).fetch(),
    currentUser: Meteor.user()
  };

})(AppTester);
