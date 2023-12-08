import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, Optional } from '@angular/core';
import { Work } from '../work.model';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.css'],
})
export class EditWorkComponent implements OnInit, AfterViewInit {
  constructor(@Optional()
    public dialogRef: MatDialogRef<EditWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Work
  ) {}

  @Input() work: Work = { id: 0, title: '', description: '', imageUrl: '', customerLink: '', hidden: false };
  @Output() saveChanges = new EventEmitter<Work>();
  @Output() cancel = new EventEmitter<void>();

  cancelEdit() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('EditWorkComponent initialized with data:', this.data);
  }

  ngAfterViewInit() {
    console.log('EditWorkComponent view initialized');
  }
}
