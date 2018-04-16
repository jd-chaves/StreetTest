import React, { Component } from 'react';
import {mount} from "react-mounter";
import Comentario from "./Comentario.js";

import { withTracker } from "meteor/react-meteor-data";


/*Cuando se renderiza esta componente no es posible navegar a otros. Se recomienda incluir algun tipo de ayuda en navegacion 
eg. ruta o boton de inicio */
class DetalleProyecto extends Component {

	constructor(props){
    super(props);
    let comentarios = this.props.proyecto.comentarios;
    let tPromedio = comentarios.length<=0 ? 0
    							: comentarios.map((comentario)=>comentario.tiempo)
													      	.reduce((timeA,timeB)=>{
													      		return Number(timeA) + Number(timeB)})/comentarios.length;
    this.state ={
      nroTarea: "",
      tiempoPromedio: tPromedio,
      comentarios: this.props.proyecto.comentarios
    }
  }

  ingreseCuentaAlert(){
		swal("Ingresa ya!", "Debes ingresar a tu cuenta para realizar esta acción", "error");
		FlowRouter.go("/");
	}

  definirTiempoPromedio(_nroTarea)
  {
  	comentarios = this.state.comentarios;
  	// comentarios = this.props.proyecto.comentarios
			// .filter((comentario)=>{return _nroTarea==="" || comentario.tarea===Number(_nroTarea)})
   //    	.map((comentario)=>comentario.tiempo)
    if(comentarios.length===0)
    	return 0;
    else{
    	return comentarios
	      	.reduce((timeA,timeB)=>{
	      		return Number(timeA) + Number(timeB)})/comentarios.length;
    }
  	
  }

	filtroPorNroTarea(evt)
	{
		this.setState({
			nroTarea : evt.target.value,
			tiempoPromedio: this.definirTiempoPromedio(evt.target.value),
			comentarios: this.props.proyecto.comentarios
											.filter((comentario)=>{return evt.target.value==="" || comentario.tarea===Number(evt.target.value)})
		});
	}

	render() {
		if(!Meteor.user()) this.ingreseCuentaAlert();

		return (
		<div className="historialdiv">
		    <div className="jumbotron container">
			
			<h2 className="display-4">Proyecto: {this.props.proyecto.nombre}</h2>
			<p className="lead">En esta sección puedes visualizar los comentarios de los Tester, 
			                 califica su colaboración y aprovecha sus opiniones para mejorar tu proyecto.</p>
            <hr className="my-4"/>	
            <p>Filtra tus comentarios por el numero de tarea en el que quieras prestar mayor atención.</p>
			<div className="form-group"> 
				<input id="ip1" className="form-control" type="text"  placeholder="Ingrese el número de la tarea" onInput={this.filtroPorNroTarea.bind(this)}/>
			</div>
			<p className="display-5" >{"El tiempo promedio para esta tarea es: "+this.state.tiempoPromedio+" minutos"}</p>
			
			<div className="container">
				<h4>Listado de comentarios</h4>
				<div className="container">
		 			{this.state.comentarios.map((comentario,i, array)=>{
		 				console.log("array", array);
		 				return <Comentario 
		 				key={comentario._id}
		 				comentario={comentario}
		 				nombreProyecto={this.props.proyecto.nombre}
		 				/>
		 			})
		 			}
		 		</div>
		 	</div>
		 	</div>
	
		</div>
		);
	}
}

export default withTracker(()=>{

  return {
    currentUser: Meteor.user()
  };

})(DetalleProyecto);
