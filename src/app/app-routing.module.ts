import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';
import { AuthGuardService } from './login/auth-guard.service';


const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'editor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
