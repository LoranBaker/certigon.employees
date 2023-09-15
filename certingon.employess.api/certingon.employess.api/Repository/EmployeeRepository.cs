using certingon.employess.api.Model;
using Newtonsoft.Json;
using System.Xml.Serialization;

namespace certingon.employess.api.Services
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly string jsonFilePath = "employee.json";
        private List<Employee> employees;

        public EmployeeRepository()
        {
            employees = LoadEmployeesFromFile();
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return employees.ToList();
        }

        public Employee GetEmployeeById(int id)
        {
            return employees.FirstOrDefault(e => e.Id == id);
        }

        public void AddEmployee(Employee employee)
        {
            employee.Id = employees.Max(e => e.Id) + 1;
            employees.Add(employee);
            SaveEmployeesToFile(employees);
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
                SaveEmployeesToFile(employees);
            }
        }

        public void DeleteEmployee(int id)
        {
            var employeeToDelete = employees.FirstOrDefault(e => e.Id == id);
            if (employeeToDelete != null)
            {
                employees.Remove(employeeToDelete);
                SaveEmployeesToFile(employees);
            }
        }

        public IEnumerable<Employee> GetEmployeeByStatus(bool isActive = true)
        {
            return employees.Where(e => e.IsActive == isActive).ToList();
        }

        public string GetEmployeesJsonString()
        {
            return JsonConvert.SerializeObject(employees);
        }

        public string GetEmployeesXmlString()
        {
            var serializer = new XmlSerializer(typeof(List<Employee>));
            var xmlString = new StringWriter();
            serializer.Serialize(xmlString, employees);
            return xmlString.ToString();
        }

        private List<Employee> LoadEmployeesFromFile()
        {
            if (File.Exists(jsonFilePath))
            {
                var jsonData = File.ReadAllText(jsonFilePath);
                return JsonConvert.DeserializeObject<List<Employee>>(jsonData);
            }
            else
            {
                return new List<Employee>();
            }
        }

        private void SaveEmployeesToFile(List<Employee> employees)
        {
            var jsonData = JsonConvert.SerializeObject(employees, Formatting.Indented);
            File.WriteAllText(jsonFilePath, jsonData);
        }
    }
}
