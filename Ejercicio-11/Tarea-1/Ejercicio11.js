"use strict";
class GeoLocalización {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }
    getPosicion(posicion) {
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy; 
          
        /* 
        SON NULL SIEMPRE
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;  
        */ 
    }
    verTodo() {
        var ubicacion=document.getElementsByTagName("main")[0];
        var datos=''; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';

        /* 
        SON NULL SIEMPRE
        datos+='<p>Altitud: '+ this.altitud +' metros</p>';
        datos+='<p>Precision altitud: '+ this.precisionAltitud +' metros</p>';
        datos+='<p>Rumbo: '+ this.rumbo +' metros</p>';
        datos+='<p>Velocidad: '+ this.velocidad +' metros</p>';
        */
        ubicacion.innerHTML = datos;
    }
}
var miPosicion = new GeoLocalización();