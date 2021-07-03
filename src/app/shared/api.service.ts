import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {EmployeeModel} from '../employee-dashboard/Employee.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmploye(data: any): Observable<EmployeeModel>{
    return this.http.post<any>('http://localhost:3000/posts', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getEmployee(): Observable<EmployeeModel>{
    return this.http.get<any>('http://localhost:3000/posts')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateEmployee(data: any, id: number): Observable<EmployeeModel>{
    return this.http.put<any>(`http://localhost:3000/posts/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteEmployee(id: number): Observable<EmployeeModel>{
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
