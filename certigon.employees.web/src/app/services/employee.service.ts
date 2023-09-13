import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })

  export class EmployeeService {

    private employee = "employees"

    constructor(private http: HttpClient) { }


    public getEmployee(): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${environment.api}/${this.employee}`);
    }
    

    public createEmployee(employee: Employee) : Observable<Employee[]>{
  
      return this.http.post<Employee[]>(
        `${environment.api}/${this.employee}`,
        employee
        );
    }

    public updateEmployee(employee: Employee) : Observable<Employee[]>{
  
      return this.http.put<Employee[]>(
        `${environment.api}/${this.employee}`,
        employee
        );
    }

    public deleteEmployee(employee: Employee) : Observable<Employee[]>{

      return this.http.delete<Employee[]>(`${environment.api}/${this.employee}/${employee.id}`);
    }
  
  }