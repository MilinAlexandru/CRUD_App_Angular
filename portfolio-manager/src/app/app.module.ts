import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDeleteDialogComponent, WorkListComponent } from './work-list/work-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EditWorkComponent } from './edit-work/edit-work.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    WorkListComponent,
    EditWorkComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
