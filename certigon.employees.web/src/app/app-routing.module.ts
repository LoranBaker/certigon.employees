import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';

const routes: Routes = [
  {path: "", component:EmployeesComponent},
  {path: 'update-employee', component: UpdateEmployeeComponent},
  {path: "add-employee",component: AddEmployeeComponent},
  {path: "delete-employee",component: DeleteEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
