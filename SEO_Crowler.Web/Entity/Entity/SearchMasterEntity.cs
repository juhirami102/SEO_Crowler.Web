using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web.Entity.Entity
{
    public class SearchMasterEntity
    {
        [Required]
        [Display(Name = "Search")]
        public string SearchPhrase { get; set; }


        [Required]
        [Display(Name = "URL")]
        public string URL { get; set; }
    }
}
