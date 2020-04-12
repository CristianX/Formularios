import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Para la aproximación por data hay que importar ReactiveFormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { DataComponent } from './components/data/data.component';

// Http Client
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
