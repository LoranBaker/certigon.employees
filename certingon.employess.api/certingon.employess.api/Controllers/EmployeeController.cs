using certingon.employess.api.Filters;
using certingon.employess.api.Model;
using certingon.employess.api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Serialization;

namespace certingon.employess.api.Controllers
{
    [ApiController]
    [Route("api/employees")]
    [ServiceFilter(typeof(LoggingActionFilter))]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _repository;
        private readonly List<Employee> _employeeData;
        public EmployeeController(IEmployeeRepository repository)
        {
            _repository = repository;
            _employeeData = LoadEmployeeDataFromJsonFile();
            
        }

        [HttpGet("json")]
        public IActionResult GetEmployeesJson()
        {
            var jsonData = _repository.GetEmployeesJsonString();
            return Ok(jsonData);
        }

        [HttpGet("xml")]
        public IActionResult GetEmployeesXml()
        {
            var xmlData = _repository.GetEmployeesXmlString();
            return Content(xmlData, "application/xml");
        }

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetAllEmployees()
        {
            var employees = _repository.GetAllEmployees().ToList();
            if (employees.Any())
            {

                return Ok(employees);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployeeById(int id)
        {
            var employee = _repository.GetEmployeeById(id);
            if (employee != null)
            {
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            _repository.AddEmployee(employee);
            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee updatedEmployee)
        {
            var existingEmployee = _repository.GetEmployeeById(id);
            if (existingEmployee != null)
            {
                _repository.UpdateEmployee(updatedEmployee);
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var existingEmployee = _repository.GetEmployeeById(id);
            if (existingEmployee != null)
            {
                _repository.DeleteEmployee(id);
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("status/{isActive}")]
        public ActionResult<Employee> GetEmployeeByStatus(bool isActive = true)
        {
            var employee = _repository.GetEmployeeByStatus(isActive);
            if (employee != null)
            {
                return Ok(employee);
            }
            else
            {
                return NoContent();
            }
        }

        private List<Employee> LoadEmployeeDataFromJsonFile()
        {
            using (StreamReader r = new StreamReader("employee.json"))
            {
                string json = r.ReadToEnd();
                return Newtonsoft.Json.JsonConvert.DeserializeObject<List<Employee>>(json);
            }
        }

    }
}
