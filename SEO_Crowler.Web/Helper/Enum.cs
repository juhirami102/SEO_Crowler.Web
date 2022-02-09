using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web.Helper
{
    public class Enum
    {

        public enum SearchEngine
        {
            [Display(Name = "Google Search")]
            google,
            [Display(Name = "Ebay Search")]
            ebay,
            [Display(Name = "Yahoo Search")]
            yahoo,
            [Display(Name = "Bing Search")]
            bing
        }
    }
}
