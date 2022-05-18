import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Formulario';
  datos:FormGroup;

  constructor(private httpclient:HttpClient){
    this.datos = new FormGroup({
      correo: new FormControl('',[Validators.required, Validators.email]),
      asunto: new FormControl('',[Validators.required]),
      mensaje: new FormControl('',[Validators.required])
    });
  }

  enviocorreos(){
    Notiflix.Loading.standard("Cargando... ")
    let params = {
      email:this.datos.value.correo,
      asunto:this.datos.value.asunto,
      mensaje:this.datos.value.mensaje
    }

    //console.log(params)
    this.httpclient.post('/envio',params).subscribe(response => {
      console.log(response)
      Notiflix.Loading.remove();
      Notiflix.Notify.success("Enviado correctamente.");
    })
  }
}

