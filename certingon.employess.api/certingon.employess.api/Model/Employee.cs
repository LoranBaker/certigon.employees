using System.Xml.Serialization;

namespace certingon.employess.api.Model
{
    [XmlRoot("Employee")]
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public Department Department { get; set; }
        public bool IsActive { get; set; }
    }

    public enum Department
    {
        Development = 0,
        Management = 1,
        HR = 2
    }
}
