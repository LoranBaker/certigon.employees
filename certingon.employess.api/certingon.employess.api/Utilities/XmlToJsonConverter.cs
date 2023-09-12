using certingon.employess.api.Model;
using Newtonsoft.Json;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace certingon.employess.api.Utilities
{
    public class XmlToJsonConverter
    {
        public string ConvertXmlToJson(XmlRequestModel xmlData)
        {
            try
            {
                var serializer = new XmlSerializer(typeof(XmlRequestModel));

                using (var writer = new StringWriter())
                {
                    serializer.Serialize(writer, xmlData);

                    var jsonString = JsonConvert.SerializeXNode(XDocument.Parse(writer.ToString()), Formatting.None, true);

                    return jsonString;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
