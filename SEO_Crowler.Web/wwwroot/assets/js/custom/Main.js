//var jsUrls = jsUrls.LoadSearchResult;

var MakeAjaxCall = function (type, url, data, showModal, tableId, modalId) {

    if (data == undefined || data == null) {
        data = {};
    }

    var modal = $('#' + modalId);
    var AlertModel = new Object();
    $("#AlertMessageWrapper").html("");
    
    $("#" + modalId + " .modal-footer").hide();

    $.ajax({
        type: type,
        url: url,
        data: data,
        success: function (data) {

            if (showModal) {
                $("#" + modalId + " #ModalContent").html(data);
                modal.modal('show');
            }
            else {
                var isFormValid = $($.parseHTML(data)).find("#IsSuccess").val() == "true";
                if (!isFormValid) {
                    AlertModel.CssClass = "alert-warning";
                    AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
                    $.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
                        $("#AlertMessageWrapper").html(resp).show();
                    });

                    $("#" + modalId + " #ModalContent").html(data);
                    modal.modal('show');
                    $("#" + modalId + " .modal-footer").show();
                }
                else {
                    AlertModel.CssClass = "alert-success";
                    AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
                    $.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
                        $("#AlertMessageWrapper").html(resp);
                    });

                    oTable = $('#' + tableId).DataTable();
                    oTable.destroy();
                    InitializeListData();
                    setTimeout(function () { modal.modal('hide'); }, 3000);
                }
            }
        },
        error(a, b, c) {
            AlertModel.CssClass = "alert-danger";
            AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
            $.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
                $("#AlertMessageWrapper").html(resp);
            });

            oTable = $('#' + tableId).DataTable();
            oTable.destroy();
            InitializeListData();
            setTimeout(function () { modal.modal('hide'); }, 3000);
        }
    });
}

var MakeAjaxCallWithImage = function (type, url, data, showModal, tableId, modalId) {

    if (data == undefined || data == null) {
        data = {};
    }

    var modal = $('#' + modalId);
    var AlertModel = new Object();
    $("#AlertMessageWrapper").html("");

    $("#" + modalId + " .modal-footer").hide();

    $.ajax({
        type: type,
        url: url,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {

            if (showModal) {
                $("#" + modalId + " #ModalContent").html(data);
                modal.modal('show');
            }
            else {
                var isFormValid = $($.parseHTML(data)).find("#IsSuccess").val() == "true";
                if (!isFormValid) {
                    AlertModel.CssClass = "alert-warning";
                    AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
                    $.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
                        $("#AlertMessageWrapper").html(resp).show();
                    });

                    $("#" + modalId + " #ModalContent").html(data);
                    modal.modal('show');
                    $("#" + modalId + " .modal-footer").show();
                }
                else {
                    AlertModel.CssClass = "alert-success";
                    AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
                    $.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
                        $("#AlertMessageWrapper").html(resp);
                    });

                    oTable = $('#' + tableId).DataTable();
                    oTable.destroy();
                    InitializeListData();
                    setTimeout(function () { modal.modal('hide'); }, 3000);
                }
            }
        },
        error(a, b, c) {
            AlertModel.CssClass = "alert-danger";
            AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
            $.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
                $("#AlertMessageWrapper").html(resp);
            });

            oTable = $('#' + tableId).DataTable();
            oTable.destroy();
            InitializeListData();
            setTimeout(function () { modal.modal('hide'); }, 3000);
        }
    }); 
}

var GetFormattedDate = function (input_date) {
    input_date = new Date(input_date);
    if (input_date != null && input_date != undefined) {
        return ('0' + (input_date.getMonth() + 1)).slice(-2) + '-'
            + ('0' + input_date.getDate()).slice(-2) + '-'
            + input_date.getFullYear();
    }
    return "";
}

var MakeAjaxCallcustom = function (type, url, data) {

    if (data == undefined || data == null) {
        data = {};
    }

 //   var modal = $('#' + modalId);
    //var AlertModel = new Object();
    //$("#AlertMessageWrapper").html("");

  //  $("#" + modalId + " .modal-footer").hide();

    //$.ajax({
    //    type: type,
    //    url: jsUrls.LoadSearchResult,
    //    data: data,
    //    success: function (data) {
    //        debugger;
          
    //            var isFormValid = $($.parseHTML(data)).find("#IsSuccess").val() == "true";
    //            if (isFormValid) {
    //                oTable = $('#SearchResult').DataTable();
    //                oTable.destroy();
    //                InitializeListData();
    //            }
            
    //    },
    //    error(a, b, c) {
    //        //AlertModel.CssClass = "alert-danger";
    //        //AlertModel.Message = $($.parseHTML(data)).find("#ResponseMessage").val();
    //        //$.post($("#hdnAlertUrl").val(), AlertModel, function (resp) {
    //        //    $("#AlertMessageWrapper").html(resp);
    //        //});

    //        oTable = $('#SearchResult').DataTable();
    //        oTable.destroy();
    //        InitializeListData();
    //        //setTimeout(function () { modal.modal('hide'); }, 3000);
    //    }
    //});
}

//$('#SearchButton').click(function () {
//    var url = jsUrls.LoadSearchResult
//    var data = $('#SearchForm').serialize();
//    MakeAjaxCallcustom("POST", url, data);
//});


//    var SearchConfiuration = (function () {

//        var configurationSearchControls = function (formName) {

//            .off("click", "#SearchButton")
//            .on("click", "#SearchButton", function (e) {
//                e.preventDefault();
//                var url = jsUrls.LoadSearchResult
//                var data = $('#SearchForm').serialize();
//                MakeAjaxCallcustom("POST", url, data);
//            });


//    return {
//        ConfigurationSearchControls: configurationSearchControls
//    };
//})();


var InitializeListData = function () {
    debugger;
    var setDefaultOrder = [0, 'desc'];
    var ajaxObject = {
        "url": jsUrls.LoadBrandList,
        "type": "POST",
        "data": function (d) {
            var pageNumber = $('#' + tableId).DataTable().page.info();
            d.PageNumber = pageNumber.page;
            d.BrandTableFilter = $('#' + tableId + 'Filter').val();
        },
        "datatype": "json"
    };

    var columnObject = [
        {
            "data": "Title", "name": "Title", "autoWidth": true, "render": function (data, type, row, meta) {

                if (data != 0) {
                    return "<span>" + row.brandId + "</span>";
                } else {
                    return "";
                }
            }
        }
        //,{
        //    "data": "brandName", "name": "BrandName", "autoWidth": true, "render": function (data, type, row, meta) {
        //        if (data != 0) {
        //            return "<span>" + row.brandName + "</span>";
        //        } else {
        //            return "";
        //        }
        //    }
        //},
        //{
        //    "data": "createdDate", "name": "CreatedDate", "autoWidth": true, "render": function (data, type, row, meta) {
        //        if (data != null) {
        //            return "<span>" + GetFormattedDate(data) + "</span>";
        //        } else {
        //            return "";
        //        }
        //    }
        //},
        //{
        //    "data": "updatedDate", "name": "UpdatedDate", "autoWidth": true, "render": function (data, type, row, meta) {
        //        if (data != null) {
        //            return "<span>" + GetFormattedDate(data) + "</span>";
        //        } else {
        //            return "";
        //        }
        //    }
        //},
        //{
        //    "data": "isActive", "name": "IsActive", "render": function (data) {
        //        if (data) {
        //            return "<span> Active</span>";
        //        } else {
        //            return "<span> Inactive</span>";
        //        }
        //    }
        //},
        //{
        //    "data": "Action", "name": "Action", "render": function (data, type, row, meta) {
        //        var html = '';
        //        html += "<span style='display:none;'>" + row.brandId + "</span>";

        //        var deleteEvent = "ConfirmDelete('" + row.brandId + "')";
        //        html += '<a type="button" class="btn btn-pinterest btn-icon-only" data-toggle="tooltip" data-placement="top" title="Delete" onclick="' + deleteEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-fat-remove"></i></span></a> &nbsp;';

        //        var editEvent = "ManageView('" + row.brandId + "')";
        //        html += '<a class="btn btn-twitter btn-icon-only" data-toggle="tooltip" data-placement="top" title="Edit" onclick = "' + editEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-badge"></i></span></a>';
        //        return html;
        //    }
        //}
    ];

    var rowCallBack = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $(nRow.cells[8]).css("background-color", aData.ColorCode);
    };
    IntializingDataTable(tableId, setDefaultOrder, ajaxObject, columnObject, rowCallBack);
}
