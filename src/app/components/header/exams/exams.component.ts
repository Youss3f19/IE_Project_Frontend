import { Component, OnInit } from '@angular/core';
import { ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
  exams: any;

  constructor(private _exam: ExamsService) {}

  ngOnInit(): void {
    this._exam.getAllExams().subscribe(
      (data: any) => {
        this.exams = data.exams;
        console.log(this.exams);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Function to open or download the exam file
  getExamById(id: string) {
    this._exam.getExamById(id).subscribe(
      (file: Blob) => {
        const url = window.URL.createObjectURL(file); // Correct type Blob
        window.open(url); // Open the file in a new tab
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
