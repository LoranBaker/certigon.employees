export class Employee {
    constructor(init?: Partial<Employee>) {
      Object.assign(this, init);
    }
  
    id?: number;
    name = "";
    surname = "";
    city = "";
    department?: Department;
    isActive?: boolean;
  }
  
  export enum Department {
    Development = 0,
    Management = 1,
    HR = 2,
  }
  