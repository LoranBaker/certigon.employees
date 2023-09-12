using certingon.employess.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using System.Threading.Tasks;
using certingon.employess.api.Utilities;

namespace certingon.employess.api.Controllers
{
    [Route("api/translate/json")]
    [ApiController]
    public class TranslateController : ControllerBase
    {
        [HttpPost]
        public IActionResult TranslateXmlToJson([FromBody] XmlRequestModel xmlData)
        {
            if (xmlData == null)
            {
                return BadRequest("Invalid XML data");
            }

            try
            {
                // Create an instance of XmlToJsonConverter
                var converter = new XmlToJsonConverter();

                // Call the ConvertXmlToJson method to convert XML to JSON
                var jsonData = converter.ConvertXmlToJson(xmlData);

                if (jsonData == null)
                {
                    return BadRequest("Failed to convert XML to JSON");
                }

                return Ok(jsonData);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
    }
}
