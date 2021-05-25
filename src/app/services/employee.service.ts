import { environment } from './../../environments/environment';
import { Employee } from './../employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeUrl: string = environment.employeeUrl;

  constructor(private httpClient: HttpClient) {}

  //all methods will return observable
  //method for get request
  public getEmployee() {
    return this.httpClient.get<Employee[]>(`${this.employeeUrl}/all`);
  }

  //method for post request
  public addEmployee(employee: Employee) {
    return this.httpClient.post<Employee>(`${this.employeeUrl}/add`, employee);
  }

  // put request
  public updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(
      `${this.employeeUrl}/update`,
      employee
    );
  }

  //Delete request
  public deleteEmployee(empId: number) {
    return this.httpClient.delete<void>(`${this.employeeUrl}/delete/${empId}`);
  }
}
