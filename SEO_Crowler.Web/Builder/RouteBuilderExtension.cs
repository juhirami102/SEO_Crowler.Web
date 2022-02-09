using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web.Builder
{
    public static class RouteBuilderExtension
    {
        public static IApplicationBuilder UseMvcWithDefaultRoute(this IApplicationBuilder app)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            return app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{area=Dashboard}/{controller=Dashboard}/{action=LoadDashboard}/{id?}");
            });
        }
    }
}
