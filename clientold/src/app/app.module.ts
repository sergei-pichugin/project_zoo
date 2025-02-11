import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatButtonModule, MatIconModule, 
				 MatInputModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalComponent } from './animal/animal.component';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalComponent,
    SettingsComponent,
    MainComponent,
    AnimalEditComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
    AppRoutingModule,
		HttpClientModule,
		FormsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatCheckboxModule,
		DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
