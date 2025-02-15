import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';

export const routes: Routes = [
    
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{
		path: 'main',
		component: MainComponent
	},
	{
		path: 'animal-add',
		component: AnimalEditComponent
	}
];