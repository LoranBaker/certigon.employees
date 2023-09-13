import { Component, OnInit } from '@angular/core';
import { Employee, Department } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) { }

  getDepartmentString(department: Department): string {
    switch (department) {
      case Department.Development:
        return 'Development';
      case Department.Management:
        return 'Management';
      case Department.HR:
        return 'HR';
      default:
        return 'Unknown';
    }
  }

  ngOnInit(): void {
    this.employeeService
    .getEmployee()
    .subscribe((result:Employee[]) => (this.employees = result));
  }

}
