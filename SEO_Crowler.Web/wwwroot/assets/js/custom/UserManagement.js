$(document).ready(function () {
    if ($('#UserDetailTable').length > 0) {
        InitializeListData();
    }
});
function InitializeListData() {
    var setDefaultOrder = [1, 'desc'];
    var ajaxObject = {
        "url": $('#hdnApplicationDirectory').val() +"Admin/UserManagement/LoadUserList",
        "type": "POST",
        "data": function (d) {
            var pageNumber = $('#UserDetailTable').DataTable().page.info();
            d.PageNumber = pageNumber.page;

            d.UserDetailFilter = $('#UserDetailFilter').val();

        },
        "datatype": "json"
    };
    var columnObject = [
        {
            "data": "userId", "name": "UserId", "autoWidth": true, "render": function (data, type, row, meta) {

                if (data != 0) {
                    return "<span>" + row.userId + "</span>";
                } else {
                    return "";
                }
            },
        },
        {
            "data": "firstName", "name": "FirstName", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + row.firstName + "</span>";
                } else {
                    return "";
                }
            },
        },
        {
            "data": "lastName", "name": "lastName", "autoWidth": true, "render": function (data, type, row, meta) {

                if (data != null) {
                    return "<span>" + row.lastName + "</span>";
                } else {
                    return "";
                }
            },
        },
        {
            "data": "mobileNumber", "name": "mobileNumber", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + row.mobileNumber + "</span>";
                } else {
                    return "";
                }
            },
        },
        {
            "data": "emailAddress", "name": "EmailAddress", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + row.emailAddress + "</span>";
                } else {
                    return "";
                }
            },
        },
        {
            "data": "roleId", "name": "RoleId", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != 0) {
                    return "<span>" + row.roleId + "</span>";
                } else {
                    return "";
                }
            },
        },
        {
            "data": "role", "name": "Role", "autoWidth": true, "render": function (data, type, row, meta) {
                if (data != null) {
                    return "<span>" + row.role + "</span>";
                } else {
                    return "";
                }
            },

        },
        {
            "data": "isActive", "name": "Active", "render": function (data) {
                if (data) {
                    return "<span> Yes</span>";
                } else {
                    return "<span> No</span>";
                }
            }
        },
        {
            "data": "Action", "name": "Action", "render": function (data, type, row, meta) {
                var html = '';
                html += "<span style='display:none;'>" + row.userId + "</span>";


                var deleteEvent = "ConfirmDelete(" + row.userId + ")";
                html += '<a type="button" class="btn btn-pinterest btn-icon-only" data-toggle="tooltip" data-placement="top" title="Delete" onclick="' + deleteEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-fat-remove"></i></span></a> &nbsp;';

                var editEvent = "ManageView(" + row.userId + ",0)";
                html += '<a class="btn btn-twitter btn-icon-only" data-toggle="tooltip" data-placement="top" title="Edit" onclick = "' + editEvent + '"><span class="btn-inner--icon elementcolor"><i class="ni ni-badge"></i></span></a>';
                return html;
            },
        },

    ];
    var rowCallBack = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $(nRow.cells[8]).css("background-color", aData.ColorCode);
    };
    IntializingDataTable("UserDetailTable", setDefaultOrder, ajaxObject, columnObject, rowCallBack);
}


var ConfirmDelete = function (UserId) {
    if (UserId != 0)
        $('#hdndel').val(UserId);
    var url = $('#hdnApplicationDirectory').val() + "Admin/UserManagement/DeleteUser/?id=" + UserId;
    MakeAjaxCall("GET", url, null, true);
}


$('#btnUpload').click(function () {

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var fileUpload = $("#input-fileupload").get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        //fileData.append('username', ‘Manas’);

        $.ajax({
            url: $('#hdnApplicationDirectory').val() + 'Admin/UserManagement/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                alert(result);
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
});  

$('#btnsaveUser').click(function (e) {

    //var objUserEntity = new Object();
    //objUserEntity.FirstName = $('#input-FirstName').val();
    //objUserEntity.LastName = $('#input-lastname').val();
    //objUserEntity.MobileNumber = $('#input-phone').val();
    //objUserEntity.EmailAddress = $('#input-email').val();
    //objUserEntity.ProfileImage = $('#input-fileupload').val();
    //objUserEntity.IsActive = $('#hdndel').val();
    //objUserEntity.RoleId = $('#ddlroleId').val();
    //var UserId = $('#input-userid').val();
  
    if (UserId > 0) {
        var url = $('#hdnApplicationDirectory').val() + "Admin/UserManagement/UserRegister/";
        var data = $('#frmUser').serialize();
        MakeAjaxCall("POST", url, data, false);
    }
});

var MakeAjaxCall = function (type, url, data, isModal) {

    if (data == undefined || data == null) {
        data = {};
    }

    var modal = $('#DeleteModal');
    modal.modal('hide');

    $.ajax({
        type: type,
        url: url,
        data: data,
        success: function (data) {
            if (isModal) {
                $("#ModalContent").html(data);
                modal.modal('show');
            }
            else {

                modal.modal('hide');
                oTable = $('#UserDetailTable').DataTable();
                oTable.draw();
            }
        },
        error(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
    });
}

var ManageView = function (UserId) {
    var url = $('#hdnApplicationDirectory').val() + "Admin/UserManagement/InsertUpdate/?id=" + UserId;
    MakeAjaxCall("GET", url, null, false);
}

