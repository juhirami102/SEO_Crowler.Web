using SEO_Crowler.Web.Entity.Entity;
using SEO_Crowler.Web.Areas.Dashboard.ViewModel;
using Microsoft.AspNetCore.Mvc;
using AngleSharp;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections;
using Newtonsoft.Json.Linq;
using SerpApi;
using System.Collections.Generic;
using System;

namespace SEO_Crowler.Web.Areas.Dashboard.Controllers
{
    public class DashboardController : Controller
    {
        #region Properties

        private readonly IConfigurationRoot _oConfiguration;
        private readonly IHttpContextAccessor _oHttpContextAccessor;
        public static string _sGetKey;

      

        #endregion

        #region Constructor

        public DashboardController(IConfigurationRoot configuration, 
                       IHttpContextAccessor httpContextAccessor)
        {
            _oConfiguration = configuration;
            _oHttpContextAccessor = httpContextAccessor;
            _sGetKey = configuration.GetSection("Apiconfig").GetSection("ApiKey").GetSection("Google").Value;
           
        }

        #endregion
        
        public IActionResult LoadDashboard(SearchViewModel searchFilter)
        {
            //Load Dashboard
            return View("LoadDashboard", searchFilter);
        }

        public async Task<IActionResult> SearchResultByPhrase(SearchViewModel searchFilter)
        {
            //Calling with SearchFilter param binding View
            return await GetSearchViewAsync("LoadDashboard", searchFilter);
        }

        private async Task<IActionResult> GetSearchViewAsync(string viewName,SearchViewModel searchFilter)
        {
            //Fetching Search Data
            var searchModel = new SearchViewModel();
            Hashtable ht = new Hashtable();
            ht.Add("q", searchFilter.SearchPhrase);
            ht.Add("hl", "en");
            ht.Add("google_domain", "google.co.uk");

            try
            {
                GoogleSearch search = new GoogleSearch(ht, _sGetKey);


                JObject data = search.GetJson();
      

                JArray searchResults = (JArray)data["organic_results"];

                searchModel.TotalRecordCount = searchResults.Count;

                List<ContactSearchResultViewModel> objsearchResult = new List<ContactSearchResultViewModel>();
                foreach (JObject result in searchResults)
                {
                 
                    objsearchResult.Add(new ContactSearchResultViewModel
                    {
                        Description = Convert.ToString(result["title"]),
                        link = Convert.ToString(result["link"])
                    });

                }
               
                searchModel.SearchResults = objsearchResult;

                search.Close();
            }
            catch (SerpApiSearchException ex)
            {
                Console.WriteLine("Exception:");
                Console.WriteLine(ex.ToString());
            }


            return View(viewName, searchModel);
        }

        
    }
}
