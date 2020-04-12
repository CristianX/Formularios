import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent  {

  forma: FormGroup;

  usuario: Object ={
    nombreCompleto: {
      nombre: 'Cristian',
      apellido: 'Tapia'
    },
    correo: 'thecristianx@hotmail.com',
    //Array
    //pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [ Validators.required, this.noTapia ])
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ),
      //Control para Array
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),

      //Validación asincrona
      'username': new FormControl('', Validators.required, this.existeUsuario),

      //Control de password
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    
    //Carga los datos con la misma estructura
    //this.forma.setValue( this.usuario );


    //Otra forma de validación
    this.forma.controls['password2'].setValidators([
      Validators.required,
      //Da error de this, hay que definir que significa this para este contexto, se lo hace con bind
      this.noIgual.bind( this.forma )
    ]);

    //Observador para estar pendiente de los cambios en la data de todo el formulario
    /*this.forma.valueChanges.subscribe( data => {
      console.log(data);
    } );*/

    //Observador para estar pendiente de los cambios en la data del campo username
    this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log(data);
    } );

    //Ver el cambio de status del campo username con statusChange
    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log(data);
    } );

   }


   //Validación personalizada
   noTapia( control: FormControl ): { [s:string]:boolean } {
     if( control.value === 'tapia' ) {
       return {
         noTapia: true
       }
     }

     return null;
   }


   //Comparación de contraseñas
   noIgual( control: FormControl ): any {
    
    //console.log(this);

    let forma: any = this;

    //Una vez definido this con bind, this.forma se borra por que hay redundancia
    if( control.value !== forma.controls['password1'].value ) {
      return {
        noIguales: true
      }
    }

    return null;
  }

  existeUsuario( control: FormControl ): Promise<any> | Observable<any>{

    let promesa = new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        //Comparación de si existe o no el usuario
        if ( control.value === 'strider' ){
          resolve( {existe: true} )
        } else {
          resolve( null );
        }
      }, 3000 );
    } );
    return promesa;
  }

   //Agregando pasatiempos al array 'pasatiempos'
   agregarPasatiempo() {
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     );
   }

   guardarCambios(){
     console.log( this.forma.value );
     console.log(this.forma);

     //Resetar valores a pristine (por defecto) borrar todos los datos
     /*this.forma.reset( {
       nombreCompleto: {
         nombre: '',
         apellido: ''
       },
       correo: ''
     });*/
     //Otra forma de resetear valores
     //this.forma.controls['correo'].setValue('nuevocorreo@sadasdad.com');
   }


}
