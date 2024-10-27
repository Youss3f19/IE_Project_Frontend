import { HttpHeaders } from '@angular/common/http'; 
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ExamsService } from 'src/app/services/exams.service';
declare var bootstrap: any;

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
   exams: any[] = [];
  filteredExams: any[] = [];
  loading: boolean = false; 
  status: string | null = null;
  classe: string | null = null;
  selectedExamId: string | null = null; 
  isDeleteAction: boolean = false;
  isAcceptAction: boolean = false;


  


  constructor(private _examService: ExamsService, private act: ActivatedRoute) {}

  ngOnInit(): void {
    this.act.paramMap.subscribe((params: ParamMap) => {
      this.status = params.get('status');
      this.classe = params.get('classe');    
      this.loadExams();
      this.initializePopovers();
    });
  }

  ngAfterViewInit(): void {
    this.initializePopovers(); // Initialize popovers after the view is fully initialized
  }

  initializePopovers(): void {
    setTimeout(() => {
      const popoverTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.forEach(popoverTriggerEl => {
        new bootstrap.Popover(popoverTriggerEl, {
          html: true, // Allow HTML content
          sanitize: false // Disable sanitization 
        });
      });
    }, 100);
  }


  setPopoverContent(item: any) {
    // Convert createdAt and updatedAt to Date objects
    const createdAtDate = new Date(item.createdAt);
    const updatedAtDate = new Date(item.updatedAt);
    
    // Format dates to a readable format
    const formattedCreatedAt = createdAtDate.toLocaleDateString(); 
    const formattedUpdatedAt = updatedAtDate.toLocaleDateString(); 
  
    return `
      <strong>Type:</strong> ${item.type} <br>
      <strong>Exam Year:</strong> ${item.examYear} <br>
      <strong>Classe:</strong> ${item.classe} <br>
      <strong>Added By:</strong> ${item.addedBy.name} ${item.addedBy.lastname} <br>
      <strong>Created At:</strong> ${formattedCreatedAt} <br>
      <strong>Updated At:</strong> ${formattedUpdatedAt} <br>
    `;
  }
  
  

  loadExams() {
    this.exams = [];  
    this.loading = true; // Start loading
    if (this.classe) {
        this._examService.getExamsByClass(this.classe).subscribe(
            (data: any) => {
                this.exams = data.exams;
                this.loading = false; // Stop loading
            },
            (error) => {
                this.loading = false; // Stop loading
                console.error(error);
            }
        );
    } else if (this.status === 'accepted') {
        this._examService.getAcceptedExams().subscribe(
            (data: any) => {
                this.exams = data.exams;
                this.loading = false; // Stop loading
            },
            (error) => {
                this.loading = false; // Stop loading
                console.error(error);
            }
        );
    } else if (this.status === 'pending') {
        const headers = this.getHeaders();
        this._examService.getPendExams(headers).subscribe(
            (data: any) => {
                this.exams = data.exams;
                this.loading = false; // Stop loading
            },
            (error) => {
                this.loading = false; // Stop loading
                console.error(error);
            }
        );
    }
}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '{}';
    const tokenObject = JSON.parse(token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenObject}`
    });
  }

  // Set accept, delete, or pend action
  setSelectedExam(id: string, action: 'accept' | 'delete' | 'pend') {
    this.selectedExamId = id;
    this.isDeleteAction = action === 'delete';
    this.isAcceptAction = action === 'accept';

    if (action === 'pend') {
      this.isDeleteAction = false;
      this.isAcceptAction = false;
    }
  }

  confirmAcceptExam() {
    const headers = this.getHeaders();
    if (this.selectedExamId ) {
      if (this.isAcceptAction) {
        console.log('Headers being sent:', headers);
        this._examService.acceptOrRejectExam(this.selectedExamId, true, headers).subscribe(
          (data: any) => {
            console.log('Exam accepted successfully:', data);
            this.exams = this.exams.filter(ex => ex._id !== this.selectedExamId);
          },
          (error) => {
            console.error('Error while accepting exam:', error);
          }
        );
      }else{
        this._examService.acceptOrRejectExam(this.selectedExamId, false, headers).subscribe(
          (data: any) => {
            console.log('Exam accepted successfully:', data);
            this.exams = this.exams.filter(ex => ex._id !== this.selectedExamId);
          },
          (error) => {
            console.error('Error while accepting exam:', error);
          }
        );
      }
    }
     
  }

  deleteExam(id: string) {
    const header = this.getHeaders();
    console.log(id);

    this._examService.deleteExam(id, header).subscribe(
      (response) => {
        console.log('Exam deleted successfully', response);
        this.exams = this.exams.filter(ex => ex._id !== id);
      },
      (error) => {
        console.error('Error deleting exam', error);
      }
    );
  }

  confirmDeleteExam() {
    if (this.selectedExamId) {
      const header = this.getHeaders();
      console.log('Deleting exam with ID:', this.selectedExamId);

      this._examService.deleteExam(this.selectedExamId, header).subscribe(
        (response) => {
          console.log('Exam deleted successfully', response);
          this.exams = this.exams.filter(ex => ex._id !== this.selectedExamId);
        },
        (error) => {
          console.error('Error deleting exam', error);
        }
      );
    }
  }

  // open or download the exam file
  getExamById(id: string) {
    this._examService.getExamById(id).subscribe(
      (file: Blob) => {
        const url = window.URL.createObjectURL(file); 
        window.open(url); // Open the file in a new tab
      },
      (error) => {
        console.log(error);
      }
    );
  }





}
