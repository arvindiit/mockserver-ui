import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SoapComponent } from './soap/soap.component';
import { RestComponent } from './rest/rest.component';
import {RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {MatLabel} from "@angular/material/form-field";
import {MatDividerModule} from "@angular/material/divider";
import {MatTable, MatTableModule} from "@angular/material/table";
import {TableModule} from "primeng/table";
import {MatIcon} from "@angular/material/icon";
import {PrimeIcons} from "primeng/api";
import {DividerModule} from "primeng/divider";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rest', component: RestComponent },
  { path: 'soap', component: SoapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SoapComponent,
    RestComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule,
    TableModule,
    DividerModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
