import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category.model';
import { Lecturer } from '../models/lecturer.model';
import { LearningOptionIconPipe } from '../learning.option.icon.pipe'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
  providers: [CoursesService, LearningOptionIconPipe]
})
export class CourseDetailsComponent implements OnInit {

  @Input() course: Course = new Course();
  isLecturer: boolean;
  category: Category;
  lecturer: Lecturer;



  constructor(private _service: CoursesService, private _actroute: ActivatedRoute, private learningOptionIcon: LearningOptionIconPipe) { }

  ngOnInit(): void {
    this._service.navigateIfNotLoggedIn()
    console.log("Course", this.course);
    this._service.getCourses()
      .then(courses => {
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
      //
    var id: number;
    this._actroute.params.subscribe(params => id = parseInt(params['id']))
    this._service.getCourseById(id)
      .subscribe({
        next: (data) =>
          this.course = data,
      })

    this._service.getCategories().subscribe((data) => this.category = data.find(c => c.id == this.course.categoryId))

    this._service.getLecturers().subscribe((data) => this.lecturer = data.find(l => l.id == this.course.lecturerId))

    this.isLecturer = sessionStorage.getItem('role') == 'lecturer';
  }
}
