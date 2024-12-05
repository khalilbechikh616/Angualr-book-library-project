import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { SessionStorageService } from 'ngx-webstorage';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { DisplayComponent } from './display/display.component';
import { ImageRotatorDirective } from './image-rotator.directive';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomepageComponent,
    CompteComponent,
    EditComponent,
    EmprunterOkComponent,
    EmprunternotokComponent,
    CategoriesComponent,
    RomansComponent,
    PoesieComponent,
    HorreurComponent,
    BandedessinesComponent,
    FantasyComponent,
    HistoireComponent,
    AdventureComponent,
    MathematiquesComponent,
    InformatiqueComponent,
    DocumentaireComponent,
    HistoriqueComponent,
    AdminsignupComponent,
    AdminComponent,
    GererlivreComponent,
    GerercompteComponent,
    GerercategorieComponent,
    GereremprunteComponent,
    DisplayComponent,
    ImageRotatorDirective,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]), // Include RouterModule.forRoot([])
    FormsModule, // Add FormsModule to imports
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }