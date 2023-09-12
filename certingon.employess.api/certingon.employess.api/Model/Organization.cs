using System.Xml.Serialization;

namespace certingon.employess.api.Model
{
    public class Organization
    {
        [XmlAttribute("RegistrationNumber")]
        public string RegistrationNumber { get; set; }

        public string Name { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }
    }

}
