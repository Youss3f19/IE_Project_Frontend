import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  private url = 'http://127.0.0.1:3001/exam/';

  constructor(private http: HttpClient, private act: ActivatedRoute) { }

  getAllExams() {
    return this.http.get(this.url + 'getExams');
  }

  // Update to return Blob type for the exam file
  getExamById(id: string) {
    return this.http.get(this.url + 'getExamById/' + id, { responseType: 'blob' });
  }
}
