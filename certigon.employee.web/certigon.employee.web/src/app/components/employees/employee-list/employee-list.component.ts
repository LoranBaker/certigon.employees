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
  showActiveEmployees = false;
  selectedDepartment: Department | 'AllDepartments' = 'AllDepartments';
  departments: (Department | 'AllDepartments')[] = [...Object.values(Department).filter(value => typeof value === 'number') as Department[], 'AllDepartments'];


  constructor(private employeeService: EmployeeService, private modalService: NgbModal) {
  }

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
    this.filterEmployees();
  }

  addEmployee() {
    const ref = this.modalService.open(AddEmployeeComponent);
  
    ref.componentInstance.employeeAdded.subscribe((addedEmployee: Employee) => {
      if (addedEmployee) {
        this.employees.push(addedEmployee);
      }
    });
  }

  editEmployee(employee: Employee) {
    const ref = this.modalService.open(EditEmployeeComponent);
    ref.componentInstance.employee = employee;
  
    ref.componentInstance.employeeUpdated.subscribe((updatedEmployee: Employee) => {
      if (updatedEmployee) {
        const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
        }
      }
    });
  }
  
  
  deleteEmployee(employee: Employee) {
    const ref = this.modalService.open(DeleteEmployeeComponent);
    ref.componentInstance.employee = employee;
  
    ref.componentInstance.employeeUpdated.subscribe((deletedEmployeeId: number) => {
      if (deletedEmployeeId) {
        this.employees = this.employees.filter((e) => e.id !== deletedEmployeeId);
      }
    });
  }
  
  filterEmployees() {
    this.employeeService
      .getEmployeesByStatus(!this.showActiveEmployees)
      .subscribe((result: Employee[]) => (this.employees = result));
  }
  
  selectDepartment(department: Department | 'AllDepartments') {
    this.selectedDepartment = department;
  
    if (department === 'AllDepartments') {
      this.employeeService
        .getEmployeesByStatus(!this.showActiveEmployees)
        .subscribe((result: Employee[]) => (this.employees = result));
    } else {
      this.employeeService
        .getDepartmentEmployees(department as Department, this.showActiveEmployees)
        .subscribe((result: Employee[]) => (this.employees = result));
    }
  }
  
  openJsonDataInNewTab() {
    this.employeeService.getEmployee().subscribe((data) => {
      const jsonData = JSON.stringify(data, null, 2);
      this.openNewTabWithData(jsonData, 'application/json');
    });
  }

  openXmlDataInNewTab() {
    this.employeeService.getEmployeeXml().subscribe((xmlData) => {
      this.openNewTabWithData(xmlData, 'application/xml');
    });
  }

  private openNewTabWithData(data: string, contentType: string) {
    const blob = new Blob([data], { type: contentType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_data.${contentType.split('/')[1]}`;
    a.target = '_blank';
    a.click();

    window.URL.revokeObjectURL(url);
  }

}


