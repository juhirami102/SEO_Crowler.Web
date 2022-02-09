using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web.Areas.Dashboard.ViewModel
{
    public class SearchResultsViewModel : ContactSearchResultViewModel
    {
        public IEnumerable<ContactSearchResultViewModel> SearchResults { get; set; }
    }
}
