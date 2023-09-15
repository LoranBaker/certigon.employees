import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employee = "employees";
  private api = "https://localhost:7279/api"

  constructor(private http: HttpClient) { }

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/${this.employee}`);
  }

  public createEmployee(employee: Employee): Observable<Employee[]> {

    return this.http.post<Employee[]>(
      `${this.api}/${this.employee}`,
      employee
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee[]> {
    const employeeId = employee.id; 
    
    return this.http.put<Employee[]>(
      `${this.api}/${this.employee}/${employeeId}`,
      employee
    );
  }
  
  public deleteEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.api}/${this.employee}/${employee.id}`);
  }

  public getEmployeesByStatus(isActive: boolean): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/${this.employee}/status/${isActive}`);
  }

  public getDepartmentEmployees(departmentId: number, isActive: boolean): Observable<Employee[]> {
    const url = `${this.api}/department/${departmentId}/${this.employee}/${isActive}`;
    return this.http.get<Employee[]>(url);
  }

  public getEmployeeJson(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/${this.employee}/json`);
  }

  public getEmployeeXml(): Observable<string> {
    return this.http.get(`${this.api}/${this.employee}/xml`, { responseType: 'text' });
  }
  
}
