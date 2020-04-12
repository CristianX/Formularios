import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit  {



  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'Hombre',
    acepta: false
  };

  paises: any[] = [];

sexos: string[] = ['Hombre', 'Mujer', 'S/N'];

  constructor( private paisService: PaisService ) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe( paises => { 
      this.paises = paises;
      this.paises.unshift( { 
        nombre: '[ Seleccione país]',
        codigo: ''
       } );
     // console.log(this.paises);
     } );
  }

  guardar( forma: NgForm ) {
    console.log('Formulario posteado');
    console.log( ' ngForm ', forma );
    console.log(' Valor ', forma.value );

    console.log('Usuario', this.usuario);
  }

}
