using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web.Helper
{
    public class URLHelper
    {
        public static string WebRootPath = string.Empty;
        public static string ValidationSummaryTitle = "Please correct the following errors";
        public static string ExceptionMesage = "Some Error Occurred";
        public static string NoRecordFound = "No Records Found.";
        public static string OperationSuccess = "Operation success";
        public static string ErrorCodeRecevied = "Error Code Recevied.";
        public static string ValidationFailed = "Validation Failed.";
        public static class SearchUrl
        {
            public static string FuelLoadURL = WebRootPath + "Admin/Fuel/LoadFuelList/";
            public static string SearchURL = WebRootPath + "Dashboard/Dashboard/SearchResultByPhrase/";
 
        }
    }
}
