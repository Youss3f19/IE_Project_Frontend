import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ExamsService } from 'src/app/services/exams.service';
import { Exam } from 'src/app/model/exam';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  examForm: FormGroup;  
  selectedFile: File | null = null;
  errorMessage: string = '';
  examId: string | null = null;

constructor(private fb: FormBuilder, private examsService: ExamsService , private router : Router , private act: ActivatedRoute) {
  this.examForm = this.fb.group({
    examTitle: ['', Validators.required],
    subject: ['', Validators.required],
    examYear: [null, [Validators.required, Validators.min(2010), Validators.max(2024)]],
    classe: ['', Validators.required],
    file: [null]  
  });
}


  ngOnInit(): void {
    // Get the exam ID from the route
    this.examId = this.act.snapshot.paramMap.get('id');
    if (this.examId) {
      // Get the exam details if examId exists (for update mode)
      this.examsService.getExamDetailsById(this.examId).subscribe({
        next: (examDetails) => {
          const reader = new FileReader();
          reader.onload = () => {
            const data = JSON.parse(reader.result as string);
            
            // Patch form values with the fetched exam details
            this.examForm.patchValue({
              examTitle: data.examTitle,
              subject: data.subject,
              examYear: data.examYear,
              classe: data.classe
            });
            console.log(this.examForm.value);  // Debug: Check patched values

          };
          reader.readAsText(examDetails);
        },
        error: (error) => {
          this.errorMessage = 'Failed to load exam details: ' + (error.error?.message || error.message);
          console.error('Error loading exam details', error);
        }
      });
    }
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.examForm.patchValue({ file: this.selectedFile });
  }

  // Get headers for FormData
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '{}';
    const tokenObject = JSON.parse(token);
    
    return new HttpHeaders({
      'Authorization': `Bearer ${tokenObject}`
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const examTitle = this.examForm.get('examTitle')?.value;
      const subject = this.examForm.get('subject')?.value;
      const examYear = this.examForm.get('examYear')?.value;
      const classe = this.examForm.get('classe')?.value;
      // Prepare the form data
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);  // Add file only if it's selected
      }
      formData.append('examTitle', examTitle);
      formData.append('subject', subject);
      formData.append('examYear', examYear);
      formData.append('classe', classe);
      

      const headers = this.getHeaders();

      if (this.examId) {
        // Update existing exam
        this.examsService.updateExam(this.examId, formData, headers).subscribe({
          next: (response) => {
            console.log('Exam updated successfully', response);
            this.router.navigate(['/dashboard/exams/pending']);  
          },
          error: (error) => {
            this.errorMessage = 'Failed to update exam: ' + (error.error?.message || error.message);
            console.error('Error updating exam', error);
          }
        });
      } else {
        // Add new exam
        this.examsService.addExam(formData, headers).subscribe({
          next: (response) => {
            console.log('Exam added successfully', response);
            this.router.navigate(['/main/exams']);  
          },
          error: (error) => {
            this.errorMessage = 'Failed to add exam: ' + (error.error?.message || error.message);
            console.error('Error adding exam', error);
          }
        });
      }
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
