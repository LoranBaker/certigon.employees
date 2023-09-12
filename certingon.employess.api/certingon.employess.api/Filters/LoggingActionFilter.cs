using Microsoft.AspNetCore.Mvc.Filters;

namespace certingon.employess.api.Filters
{
    public class LoggingActionFilter : ActionFilterAttribute
    {
        private readonly ILogger<LoggingActionFilter> _logger;

        public LoggingActionFilter(ILogger<LoggingActionFilter> logger)
        {
            _logger = logger;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Log request data
            var request = context.HttpContext.Request;
            var requestInfo = new
            {
                Method = context.HttpContext.Request.Method,
                URL = request.Path,
                HttpMethod = request.Method,
                Arguments = context.ActionArguments
            };
            _logger.LogInformation("Request: {@RequestInfo}", requestInfo);

            // Continue with the action execution
            var resultContext = await next();

            // Log response data
            var responseInfo = new
            {
                StatusCode = context.HttpContext.Response.StatusCode,
                Result = resultContext.Result
            };
            _logger.LogInformation("Response: {@ResponseInfo}", responseInfo);
        }
    }
}
