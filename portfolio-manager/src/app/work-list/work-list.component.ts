import { Component, Inject, OnInit } from '@angular/core';
import { Work } from '../work.model';
import { WorkService } from '../work.service';
import {MatTableDataSource} from '@angular/material/table'
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditWorkComponent } from '../edit-work/edit-work.component';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
})
export class WorkListComponent implements OnInit {
  works: Work[] = [];
  newWork: Work = {
    title: '', 
    description: '',
    id: 0,
    imageUrl: '',
    hidden: false,
    customerLink: ''
  };
  displayedColumns: string[] = ['id', 'title', 'description', 'imageUrl', 'hidden', 'customerLink', 'actions'];
  dataSource = new MatTableDataSource<Work>();
  selectedWork: Work | null = null;

  constructor(private workService: WorkService , private dialog: MatDialog) {}

  ngOnInit(): void {
    this.workService.getWorks().subscribe((works) => {
      this.works = works;
      this.dataSource.data = this.works;
    });
  }
  editWork(work: Work) {
    this.selectedWork = work;
  }
  addWork() {
    this.newWork.id = this.works.length + 1;

    const newWorkCopy: Work = { ...this.newWork };
    this.works.push(newWorkCopy);
    this.dataSource.data = this.works;
    this.workService.addWork(newWorkCopy);

    this.newWork = {
      id: 0,
      title: '',
      description: '',
      imageUrl: '',
      customerLink: '',
      hidden: false,
    };
  }


  updateWork(updatedWork: Work) {
    this.workService.updateWork(updatedWork);
  }

  deleteWork(workId: number) {
    // Confirm deletion using MatDialog
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: 'Are you sure you want to delete this work?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.workService.deleteWork(workId);
      }
    });
  }

  saveChanges(updatedWork: Work) {
    const index = this.works.findIndex(w => w.id === updatedWork.id);
    if (index !== -1) {
      this.works[index] = updatedWork;
      console.log('Changes saved:', updatedWork);
    }
    this.selectedWork = null;
  }
  cancelEdit() {
    this.selectedWork = null;
    console.log('Edit canceled');
  }

  openEditModal(selectedWork: Work) {
    const dialogRef = this.dialog.open(EditWorkComponent, {
      data: { ...selectedWork },
    });
  
    dialogRef.afterClosed().subscribe((result: Work) => {
      if (result) {
        const index = this.works.findIndex((w) => w.id === result.id);
        if (index !== -1) {
          this.works[index] = { ...result };
        }
        console.log('Changes saved:', this.works[index]);
      }
    });
  } 
}

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `
    <h1 mat-dialog-title>Delete Confirmation</h1>
    <div mat-dialog-content>{{ data }}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true">Delete</button>
    </div>
  `,
})

export class ConfirmDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
  


