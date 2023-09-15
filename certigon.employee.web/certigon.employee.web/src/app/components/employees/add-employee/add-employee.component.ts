import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department, Employee } from 'src/app/models/employee.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee[]>();
  @Output() employeeAdded = new EventEmitter<Employee>();


  addEmployee: FormGroup;
  addEmployees: Employee = new Employee();

  departmentOptions: string[] = ['Development', 'Management', 'HR'];

  constructor(public modal: NgbActiveModal, private employeeService: EmployeeService, private fb: FormBuilder, private toastr:ToastrService) {
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
    if (this.addEmployee.valid) {
      const formData = this.addEmployee.value;
      const selectedDepartment = this.getDepartmentValue(formData.department);

      const addedEmployee = new Employee({
        ...formData,
        department: selectedDepartment
      });

      this.employeeService.createEmployee(addedEmployee).subscribe(() => {
        this.employeeAdded.emit(addedEmployee);
        this.toastr.success("You have successfully added new employee!");
        this.modal.close();
      });
    }
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
