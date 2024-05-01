import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompteComponent } from './compte/compte.component';
import { EditComponent } from './edit/edit.component';
import { EmprunterOkComponent } from './emprunterok/emprunterok.component';
import { EmprunternotokComponent } from './emprunternotok/emprunternotok.component';
import { CategoriesComponent } from './categories/categories.component';
import { RomansComponent } from './romans/romans.component';
import { PoesieComponent } from './poesie/poesie.component';
import { HorreurComponent } from './horreur/horreur.component';
import { BandedessinesComponent } from './bandedessines/bandedessines.component';
import { FantasyComponent } from './fantasy/fantasy.component';
import { HistoireComponent } from './histoire/histoire.component';
import { AdventureComponent } from './adventure/adventure.component';
import { MathematiquesComponent } from './mathematiques/mathematiques.component';
import { InformatiqueComponent } from './informatique/informatique.component';
import { DocumentaireComponent } from './documentaire/documentaire.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { AdminComponent } from './admin/admin.component';
import { GererlivreComponent } from './gererlivre/gererlivre.component';
import { GerercompteComponent } from './gerercompte/gerercompte.component';
import { GerercategorieComponent } from './gerercategorie/gerercategorie.component';
import { GereremprunteComponent } from './gereremprunte/gereremprunte.component';
import { DisplayComponent } from './display/display.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'edit', component: EditComponent },
  { path: 'emprunterok', component: EmprunterOkComponent },
  { path: 'emprunternotok', component: EmprunternotokComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'romans', component: RomansComponent },
  { path: 'poesie', component: PoesieComponent },
  { path: 'horreur', component: HorreurComponent },
  { path: 'bandedessines', component: BandedessinesComponent },
  { path: 'fantasy', component: FantasyComponent },
  { path: 'histoire', component: HistoireComponent },
  { path: 'adventure', component: AdventureComponent },
  { path: 'mathematiques', component: MathematiquesComponent },
  { path: 'informatiques', component: InformatiqueComponent },
  { path: 'documentaires', component: DocumentaireComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'adminsignup', component: AdminsignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'gererlivre', component: GererlivreComponent },
  { path: 'gerercompte', component: GerercompteComponent },
  { path: 'gerercategorie', component: GerercategorieComponent },
  { path: 'gereremprunte', component: GereremprunteComponent},
  { path: 'display', component: DisplayComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }