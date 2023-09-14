import { Component, OnInit } from '@angular/core';
import { Department, Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService, private modalService: NgbModal) { }

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

  addEmployee(){
    const ref = this.modalService.open(AddEmployeeComponent);
    ref.componentInstance.employees = new Employee();
    ref.result.then((ok)=>{
      console.log("ok");
      
    },
    (cancel)=>{
      console.log("cancel");
    });
    
  }

  editEmployee(employee: Employee){

    const ref = this.modalService.open(EditEmployeeComponent);
    ref.componentInstance.employee = employee;

    ref.result.then((ok)=>{
      console.log("ok");
    },
    (cancel)=>{
      console.log("cancel");
    });
  }

  deleteEmployee(employee: Employee){

    const ref = this.modalService.open(DeleteEmployeeComponent);
    ref.componentInstance.employee = employee;

    ref.result.then((ok)=>{
      console.log("ok");
    },
    (cancel)=>{
      console.log("cancel");
    });
  }

}


