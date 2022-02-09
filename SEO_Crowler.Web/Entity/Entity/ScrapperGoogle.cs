using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web.Entity.Entity
{
    public class ScrapperGoogle
    {
        public string Description { get; set; }
        public int Count { get; set; }
        public int FollowingCount { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
