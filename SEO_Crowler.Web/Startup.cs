using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using SEO_Crowler.Response;
using SEO_Crowler.Web.Builder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SEO_Crowler.Web
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddMvc();
            services.AddMvc(options => options.EnableEndpointRouting = false);
            services.AddSingleton(provider => Configuration);
            services.AddSingleton<IConfigurationRoot>(provider => (IConfigurationRoot)Configuration);
            services.AddHealthChecks();
            services.AddRouting();
            services.AddScoped(typeof(IObjectResponseHandler<>), typeof(ObjectResponseHandler<>));

            services.AddSingleton<IFileProvider>(
              new PhysicalFileProvider(
              Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.WithOrigins(Configuration.GetSection("Apiconfig").GetSection("Weburl").Value.Trim('/') + "/"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) 
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            RouteBuilderExtension.UseMvcWithDefaultRoute(app);
            app.UseStaticFiles();

            app.UseRouting();

        }

       
    }
}
