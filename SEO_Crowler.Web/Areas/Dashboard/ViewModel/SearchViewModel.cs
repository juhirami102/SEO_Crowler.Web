using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using SEO_Crowler.Web.Helper;
using static SEO_Crowler.Web.Helper.Enum;

namespace SEO_Crowler.Web.Areas.Dashboard.ViewModel
{
    public class SearchViewModel : SearchResultsViewModel
    {
        [Required]
        [Display(Name = "Search")]
        public string SearchPhrase { get; set; }


        [Required]
        [Display(Name = "URL")]
        public string URL { get; set; }

        public SearchEngine SearchEngine { get; set; }

        public int? TotalRecordCount { get; set; }

        public bool IsSearchPerformed() => TotalRecordCount.GetValueOrDefault() != 0 || TotalRecordCount.HasValue;
    }
}
