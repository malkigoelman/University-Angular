import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course, learningOptions } from "./models/course.model";
import { Observable } from "rxjs";
import { Category } from "./models/category.model";
import { Router } from "@angular/router";
import { Lecturer } from "./models/lecturer.model";

@Injectable()
export class CoursesService {
  

    private readonly _serviceName = "/university";

    navigateIfNotLoggedIn(): void {
        if (!sessionStorage.getItem('userToken'))
            this._router.navigate(['/']);
    }

    getCourses(): Promise<Course[]> {
        return new Promise((res, rej) => {
            this._http.get<Course[]>(this._serviceName + `/courses`)
                .subscribe({ next: (data) => res(data), error: (error) => rej(error) })
        })
    }

    getCourseById(id: number): Observable<Course> {
        return this._http.get<Course>(this._serviceName + `/courses/${id}`)
    }

    addCourse(course: Course): Observable<Course> {
        return this._http.post<Course>(this._serviceName + `/courses`, course)
    }

    editCouse(id: number, course: Course): Observable<Course> {
        return this._http.put<Course>(this._serviceName + `/courses/${id}`, course)
    }

    deleteCourse(course: Course): Promise<Course> {
        return new Promise((res, rej) => {
            this._http.post<Course>(this._serviceName + `/courses`, course)
                .subscribe({ next: (data) => res(data), error: (error) => rej(error) })
        })
    }

    getCategories(): Observable<Category[]> {
        return this._http.get<Category[]>(this._serviceName + `/categories`)
    }

    getLecturers(): Observable<Lecturer[]> {
        return this._http.get<Lecturer[]>(this._serviceName + `/lecturers`)
    }

    constructor(private _http: HttpClient, private _router: Router) { }
}