import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department, Employee } from 'src/app/models/employee.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee[]>();

  departmentOptions: string[] = Object.values(Department)
    .filter(value => typeof value === 'string')
    .map(value => value as string); 

  editEmployee: FormGroup;
  

  constructor(
    public modal: NgbActiveModal,
    private employeeService: EmployeeService,
    private fb: FormBuilder, private toastr:ToastrService
  ) {
    this.editEmployee = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      surname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      department: new FormControl('', Validators.required),
      isActive: new FormControl(true)
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.editEmployee.patchValue({
        name: this.employee.name,
        surname: this.employee.surname,
        city: this.employee.city,
        department: Department[this.employee.department] || '', 
        isActive: this.employee.isActive || false
      });

    }
  }

  updateEmployee() {
    if (this.editEmployee.valid) {
      const updatedEmployee = this.editEmployee.value;
  
      updatedEmployee.department = this.getDepartmentValue(updatedEmployee.department);
  
      if (this.employee) {
        updatedEmployee.id = this.employee.id;
      }
  
      this.employeeService.updateEmployee(updatedEmployee).subscribe((updatedEmployee: Employee[]) =>
        this.employeeUpdated.emit(updatedEmployee)
      );
      this.toastr.success("You have successfully updated employee!");
      this.modal.close();
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
        return Department.Development; 
    }
  }
  
}
