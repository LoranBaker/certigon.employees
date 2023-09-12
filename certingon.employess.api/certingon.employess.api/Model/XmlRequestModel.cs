using System.Xml.Serialization;

namespace certingon.employess.api.Model
{

    [XmlRoot("Organization")]
    public class XmlRequestModel
    {
        [XmlAttribute("RegistrationNumber")]
        public string RegistrationNumber { get; set; }

        public string Name { get; set; }

        [XmlElement("Offices")]
        public Organization[] Offices { get; set; }

        public string Country { get; set; }

        public string Address { get; set; }
    }


}
