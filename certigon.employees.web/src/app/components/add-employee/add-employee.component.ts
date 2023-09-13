import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';
// import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee[]>();

  addFamilies!: FormGroup;
  employeeAdd: Employee = new Employee();
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

}
