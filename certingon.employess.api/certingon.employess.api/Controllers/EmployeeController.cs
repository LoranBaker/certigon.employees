using certingon.employess.api.Filters;
using certingon.employess.api.Model;
using certingon.employess.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace certingon.employess.api.Controllers
{
    [ApiController]
    [Route("api/employees")]
    [ServiceFilter(typeof(LoggingActionFilter))]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeController(IEmployeeRepository repository)
        {
            _repository = repository;
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
    }
}
