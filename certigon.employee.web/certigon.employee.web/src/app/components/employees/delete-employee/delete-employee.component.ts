import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Inject, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit{
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<number>();

  constructor(public modal: NgbActiveModal,private employeeService: EmployeeService,private toastr:ToastrService) { }


  ngOnInit(): void {
    console.log(this.employee);
  }


  deleteFamilies(employee: Employee) {
    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.employeeUpdated.emit(employee.id);
      this.toastr.success("You have successfully deleted employee!"); 
      this.modal.close();
    });
  }
  
}
