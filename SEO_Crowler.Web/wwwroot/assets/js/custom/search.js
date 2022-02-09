var SORT_DIRECTION = {
    ASCENDING: "ASC",
    DESCENDING: "DESC"
};

var SearchConfiuration = (function () {

    var configurationSearchControls = function (formName)
        $(document)
        .off("click", "#SearchButton")
        .on("click", "#SearchButton", function (e) {
            e.preventDefault();
            SearchUtilities.pe
          });


      return  {
          ConfigurationSearchControls: configurationSearchControls
    };
})();


var SearchUtilities = (function () {

    var performSearch = function (formName, forceSearch) {

        $("#SearchButton_CurrentPageNumber").val(1);
        getSearchResults(formName, forceSearch || false);
    };
        
    var performPaging = function (control,formName, forceSearch) {

       
    };   

    var performSort = function (control, formName, forceSearch) {


    };   

    return {
        ConfigurationSearchControls: configurationSearchControls
    };
})();