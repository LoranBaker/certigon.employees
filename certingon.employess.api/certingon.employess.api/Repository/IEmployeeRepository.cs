using certingon.employess.api.Model;

namespace certingon.employess.api.Services
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee GetEmployeeById(int id);
        IEnumerable<Employee> GetEmployeeByStatus(bool isActive = true);
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee updatedEmployee);
        void DeleteEmployee(int id);
    }
}
