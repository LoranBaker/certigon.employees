import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department, Employee } from 'src/app/models/employee.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee[]>();

  addEmployee: FormGroup;
  addEmployees: Employee = new Employee();

  departmentOptions: string[] = ['Development', 'Management', 'HR'];


  constructor(public modal: NgbActiveModal, private employeeService: EmployeeService, private fb: FormBuilder) {
    this.addEmployee = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])),
      department: new FormControl('Development'),
      isActive: new FormControl(true)
    })
  }

  ngOnInit(): void {
  }

    createEmployee() {
    const formData = this.addEmployee.value;
    const selectedDepartment = this.getDepartmentValue(formData.department);

    const addEmployee = new Employee({
      ...formData,
      department: selectedDepartment
    });

    this.employeeService.createEmployee(addEmployee).subscribe((employees: Employee[]) => this.employeeUpdated.emit(employees));
    this.modal.close();
  }

  private getDepartmentValue(departmentString: string): Department {
    switch (departmentString) {
      case 'Development':
        return Department.Development;
      case 'Management':
        return Department.Management;
      case 'HR':
        return Department.HR;
      default:
        return Department.HR;
    }
  }

  

  get f() {
    return this.addEmployee.controls;
  }
}
