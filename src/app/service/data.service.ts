import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IEmployeeModel } from '../models/employee-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseApiUrl = "https://localhost:7268/";

  constructor(private http: HttpClient) { }

  getDepartmentList(): Observable<any> {
    return this.http.get(this.baseApiUrl + "api/Ade/GetDepartments")
  }

  private getHeaders() {
    const headers = new HttpHeaders().set('ContentType', 'application/json');  
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, DELETE");
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Requested-With, Content-Type, Accept");
    return headers;
  }

  addEmployee(employee: IEmployeeModel): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.baseApiUrl + "api/Ade/AddEmployee", employee,{ headers: headers});
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.baseApiUrl + "api/Ade/GetEmployees")
  }

  updateEmployees(employees: IEmployeeModel[]): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.put<any>(this.baseApiUrl + "api/Ade/UpdateEmployees", employees,{ headers: headers});
    // return this.http.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     })
    // })
    // //return this.http.post<any>(this.baseApiUrl + "api/Ade/UpdateEmployees", employee,{ headers: headers});
    // .pipe(catchError(this.handleError));
}

  
}
