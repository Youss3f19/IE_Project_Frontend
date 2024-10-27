import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../model/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private apiUrl = 'http://127.0.0.1:3001/exam/';

  constructor(private http: HttpClient) {}

  // Get all accepted exams
  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}getAcceptedExams`);
  }

  // Get accepted exams
  getAcceptedExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}getAcceptedExams`);
  }

  // Get pending exams
  getPendExams(headers: HttpHeaders): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}getPendExams`, { headers });
  }

  // Get exam by ID (returns  Blob for file download)
  getExamById(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}getExamById/${id}`, { responseType: 'blob' });
  }

  // Get exam by ID 
  getExamDetailsById(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}getExamDetailsById/${id}` ,{ responseType: 'blob' });
  }

  // update exam
  updateExam(id: string, formData: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}updateExam/${id}`, formData, { headers });
  }

  // Add new exam
  addExam(formData: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}addExam`, formData, { headers });
  }

  // Accept or reject exam
  acceptOrRejectExam(id: string, status: boolean, headers: HttpHeaders): Observable<any> {
    return this.http.put(`${this.apiUrl}acceptOrRejectExam/${id}`, { accepted: status }, { headers });
  }


  // Delete exam by ID
  deleteExam(id: string, headers: HttpHeaders): Observable<any> {
    return this.http.delete(`${this.apiUrl}deleteExam/${id}`, { headers });
  }

  // Get exams by class
  getExamsByClass(classe: string): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}getExamsByClasse/${classe}`);
  }

}
