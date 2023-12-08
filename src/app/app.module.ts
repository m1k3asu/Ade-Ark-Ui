import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GridModule } from 'smart-webcomponents-angular/grid';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, GridModule, HttpClientModule ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }