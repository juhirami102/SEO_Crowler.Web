var tableId = jsUrls.ColorTableId;
var modalId = jsUrls.ColorModalId;

$(document).ready(function () {
    if ($('#' + tableId).length > 0) {
        InitializeListData();
    }
});

var InitializeListData = function () {

    var setDefaultOrder = [0, 'desc'];
    var ajaxObject = {
        "url": jsUrls.LoadColorList,
        "type": "POST",
        "data": function (d) {
            var pageNumber = $('#' + tableId).DataTable().page.info();
            d.PageNumber = pageNumber.page;
            d.ColorTableFilter = $('#' + tableId + 'Filter').val();
        },
        "datatype": "json"
    };

    var columnObject = [
        {
            "data": "colorId", "name": "colorId", "autowidth": true, "render": function (data, type, row, meta) {
                if (data != 0) {
                    return "<span>" + row.colorId + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "colorName", "name": "ColorName", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != 0) {
                    return "<span>" + row.colorName + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "createdDate", "name": "CreatedDate", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + GetFormattedDate(data) + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "updatedDate", "name": "UpdatedDate", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + GetFormattedDate(data) + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "isActive", "name": "IsActive", "render": function (data) {
                if (data) {
                    return "<span> Active</span>";
                } else {
                    return "<span> Inactive</span>";
                }
            }
        },
        {
            "data": "Action", "name": "Action", "render": function (data, type, row, meta) {
                var html = '';
                html += "<span style='display:none;'>" + row.colorId + "</span>";

                var deleteEvent = "ConfirmDelete('" + row.colorId + "')";
                html += '<a type="button" class="btn btn-pinterest btn-icon-only" data-toggle="tooltip" data-placement="top" title="Delete" onclick="' + deleteEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-fat-remove"></i></span></a> &nbsp;';

                var editEvent = "ManageView('" + row.colorId + "')";
                html += '<a class="btn btn-twitter btn-icon-only" data-toggle="tooltip" data-placement="top" title="Edit" onclick = "' + editEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-badge"></i></span></a>';
                return html;
            }
        }
    ];

    var rowCallBack = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $(nRow.cells[8]).css("background-color", aData.ColorCode);
    };
    IntializingDataTable(tableId, setDefaultOrder, ajaxObject, columnObject, rowCallBack);
}

var ManageView = function (id) {
    var url = jsUrls.InsertUpdateColor + "?id=" + id;
    MakeAjaxCall("GET", url, null, true, tableId, modalId);
}

var ConfirmDelete = function (ColorId) {
    if (ColorId != 0)
        $('#hdnDelColorId').val(ColorId);
    var url = jsUrls.DeleteColor + "?id=" + ColorId;
    MakeAjaxCall("GET", url, null, true, tableId, modalId);
}

$('#btnAddColor').click(function () {
    var url = jsUrls.InsertUpdateColor;
    MakeAjaxCall("GET", url, null, true, tableId, modalId);
});