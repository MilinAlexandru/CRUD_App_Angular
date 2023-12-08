import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Work } from './work.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private works: Work[] = [];
  private worksSubject = new BehaviorSubject<Work[]>([]);

  getWorks() {
    return this.worksSubject.asObservable();
  }

  addWork(work: Work) {
    this.works.push(work);
    this.worksSubject.next([...this.works]);
  }

  updateWork(updatedWork: Work) {
    const index = this.works.findIndex((work) => work.id === updatedWork.id);
    if (index !== -1) {
      this.works[index] = updatedWork;
      this.worksSubject.next([...this.works]);
    }
  }

  deleteWork(workId: number) {
    this.works = this.works.filter((work) => work.id !== workId);
    this.worksSubject.next([...this.works]);
  }
}
