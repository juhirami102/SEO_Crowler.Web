var tableId = jsUrls.PromoCodeTableId;
var modalId = jsUrls.PromoCodeModalId;

$(document).ready(function () {
    if ($('#' + tableId).length > 0) {
        InitializeListData();
    }
});

var InitializeListData = function () {

    var setDefaultOrder = [0, 'desc'];
    var ajaxObject = {
        "url": jsUrls.LoadPromoCodeList,
        "type": "POST",
        "data": function (d) {
            var pageNumber = $('#' + tableId).DataTable().page.info();
            d.PageNumber = pageNumber.page;
            d.PromoCodeTableFilter = $('#' + tableId + 'Filter').val();
        },
        "datatype": "json"
    };
    var columnObject = [
        {
            "data": "promoCodeId", "name": "PromoCodeId", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != 0) {
                    return "<span>" + row.promoCodeId + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "promoCode", "name": "PromoCode", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != 0) {
                    return "<span>" + row.promoCode + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "discount", "name": "Discount", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + row.discount + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "validityType", "name": "ValidityType", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + GetValidityType(row.validityType) + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "activationDate", "name": "ActivationDate", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + GetFormattedDate(data) + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "expiryDate", "name": "ExpiryDate", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + GetFormattedDate(data) + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "usageLimit", "name": "UsageLimit", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + row.usageLimit + "</span>";
                } else {
                    return "";
                }
            }
        },
        {
            "data": "systemType", "name": "systemType", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + GetSystemType(row.systemType) + "</span>";
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
                html += "<span style='display:none;'>" + row.promoCodeId + "</span>";

                var deleteEvent = "ConfirmDelete('" + row.promoCodeId + "')";
                html += '<a type="button" class="btn btn-pinterest btn-icon-only" data-toggle="tooltip" data-placement="top" title="Delete" onclick="' + deleteEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-fat-remove"></i></span></a> &nbsp;';

                var editEvent = "ManageView('" + row.promoCodeId + "')";
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
    var url = jsUrls.InsertUpdatePromoCode + "?id=" + id;
    MakeAjaxCall("GET", url, null, true, tableId, modalId);
}

var ConfirmDelete = function (PromoCodeId) {
    if (PromoCodeId != 0)
        $('#hdnDelPromoCodeId').val(PromoCodeId);
    var url = jsUrls.DeletePromoCode + "?id=" + PromoCodeId;
    MakeAjaxCall("GET", url, null, true, tableId, modalId);
}

$('#btnAddPromoCode').click(function () {
    var url = jsUrls.InsertUpdatePromoCode;
    MakeAjaxCall("GET", url, null, true, tableId, modalId);
});

