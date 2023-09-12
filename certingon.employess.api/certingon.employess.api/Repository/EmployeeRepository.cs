using certingon.employess.api.Model;

namespace certingon.employess.api.Services
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private List<Employee> employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "John", Surname = "Doe", City = "New York", Department = Department.Management, IsActive = false },
            new Employee { Id = 2, Name = "Jane", Surname = "Smith", City = "Los Angeles", Department = Department.HR, IsActive = true}
        };

        public IEnumerable<Employee> GetAllEmployees()
        {
            return employees;
        }

        public Employee GetEmployeeById(int id)
        {
            return employees.FirstOrDefault(e => e.Id == id);
        }

        public void AddEmployee(Employee employee)
        {
            employee.Id = employees.Max(e => e.Id) + 1;
            employees.Add(employee);
        }

        public void UpdateEmployee(Employee updatedEmployee)
        {
            var existingEmployee = employees.FirstOrDefault(e => e.Id == updatedEmployee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = updatedEmployee.Name;
                existingEmployee.Surname = updatedEmployee.Surname;
                existingEmployee.City = updatedEmployee.City;
                existingEmployee.Department = updatedEmployee.Department;
                existingEmployee.IsActive = updatedEmployee.IsActive;
            }
        }

        public void DeleteEmployee(int id)
        {
            var employeeToDelete = employees.FirstOrDefault(e => e.Id == id);
            if (employeeToDelete != null)
            {
                employees.Remove(employeeToDelete);
            }
        }

        public Employee GetEmployeeByStatus(bool isActive = true)
        {
            return employees.FirstOrDefault(e => e.IsActive == isActive);
        }
    }
}
