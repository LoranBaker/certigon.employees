import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Inject, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit{
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee[]>();

  constructor(public modal: NgbActiveModal,private employeeService: EmployeeService) { }


  ngOnInit(): void {
    console.log(this.employee);
  }


  deleteFamilies(employees:Employee){
    this.employeeService.deleteEmployee(employees).subscribe((employees: Employee[])=> this.employeeUpdated.emit(employees));
    this.modal.close();
  }
}
