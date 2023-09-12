using certingon.employess.api.Model;
using certingon.employess.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace certingon.employess.api.Controllers
{

        [ApiController]
        [Route("api/department")]
        public class DepartmentController : Controller
        {
            private readonly IEmployeeRepository _repository;

            public DepartmentController(IEmployeeRepository repository)
            {
                _repository = repository;
            }

            [HttpGet("{departmentId}/employees/{isActive}")]
            public IEnumerable<Employee> GetEmployeesByDepartment(int departmentId, bool isActive = true)
            {
                if (departmentId < 0 || departmentId > 2)
                {
                    throw new ArgumentOutOfRangeException("departmentId", "Department ID must be within the range of 0-2.");
                }

                // Filter employees by department and active status
                var filteredEmployees = _repository.GetAllEmployees()
                    .Where(e => e.Department == (Department)departmentId && (isActive ? e.IsActive : !e.IsActive))
                    .ToList();

                return filteredEmployees;
            }
        }
    }

