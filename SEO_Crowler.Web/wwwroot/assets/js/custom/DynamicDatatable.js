
function IntializingDataTable(id, setDefaultOrder, ajaxObject, columnObject, rowCallBack, drawCallback) {
    var dtId = id;
    var dataTableInst =
        $('#' + id + '').DataTable({
            order: setDefaultOrder,
            processing: false,
            serverSide: true,
            stateSave: true,
            orderMulti: false,
            filter: true,
            orderCellsTop: true,
            "bLengthChange": true,
            'bSortable': true,
            fixedHeader: true,
            "pageLength": 25,
            dom: 'Blfrtip',
            //stateSaveCallback: function (settings, data) {
            //    localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data));
            //},
            //stateLoadCallback: function (settings, data) {
            //    return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance));
            //},
            buttons: [
                'excelHtml5',
                'pdfHtml5',
                {
                    extend: 'print',
                    messageTop: function () {
                        printCounter++;

                        if (printCounter === 1) {
                            return 'This is the first time you have printed this document.';
                        }
                        else {
                            return 'You have printed this document ' + printCounter + ' times';
                        }
                    },
                    messageBottom: null
                }
            ],
            "ajax": ajaxObject,
            "fnRowCallback": rowCallBack,
            "columns": columnObject,
            initComplete: function (settings, json) {
                //debugger;
                var data = JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance));

                var columnIndex = 0;
                var cusApi = this;
                this.api().columns().every(function () {

                    var column = this;
                    var searchValueForColumn = '';
                    if (data != null) {
                        searchValueForColumn = data.columns[columnIndex].search.search;
                    }
                    var findTD = $('#' + dtId + ' tr.filterContext th:eq(' + columnIndex + ')');

                    var select;

                    if (!findTD.hasClass("noFilter")
                        && !findTD.hasClass("comboFilter")
                        && !findTD.hasClass("comboCustomFilter")
                        && !findTD.hasClass("activeFilter")
                        && !findTD.hasClass("dateFilter")
                        && !findTD.hasClass("searchFilter")
                        ) {
                        select = $('<input type="text" class="form-control searchVal" value="' + searchValueForColumn + '" />')
                            .appendTo(findTD.empty())
                            .on('keyup', function (event) {
                                if (event.keyCode === 13) {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );

                                    column
                                        .search(val ? val : '', true, true, false)
                                        .draw();
                                }

                            });
                    } else if (findTD.hasClass("searchFilter")) {
                        select = $('<a class="btn btn-primary btn-sm" ><span class="fa fa-search fa-1" aria-hidden="true"><span class="nav-label"></span> </span></a>')
                            .appendTo(findTD.empty())
                            .on('click', function () {
                                FullFilter(cusApi, data, dtId);
                            });
                    }
                    else if (findTD.hasClass("comboFilter")) {
                        select = $('<select class="form-control" />')
                            .appendTo(findTD.empty())
                            .on('change', function () {
                                var val = $(this).val();

                                column
                                    .search(val ? val : '', true, true, false)
                                    .draw();
                            });

                        select.append('<option value="">-- Select --</option>');

                        column.data().unique().sort().each(function (d, j, e) {
                            if (d == true) {
                                select.append('<option value="Yes">Yes</option>');
                            } else if (d == false) {
                                select.append('<option value="No">No</option>');
                            } else {
                                select.append('<option value="' + d + '">' + d + '</option>');
                            }
                        });

                        select.val(searchValueForColumn);

                    }
                    else if (findTD.hasClass("activeFilter")) {
                        select = $('<select class="form-control" />')
                            .appendTo(findTD.empty())
                            .on('change', function () {
                                var val = $(this).val();

                                column
                                    .search(val ? val : '', true, true, false)
                                    .draw();
                            });

                        select.append('<option value="">-- Select --</option>');

                        column.data().unique().sort().each(function (d, j, e) {
                            if (d == true) {
                                select.append('<option value="1">Active</option>');
                            } else if (d == false) {
                                select.append('<option value="0">Inactive</option>');
                            } 
                        });

                        select.val(searchValueForColumn);

                    }
                    else if (findTD.hasClass("dateFilter")) {
                        select = $('<input autocomplete="off" placeholder="mm-dd-yyyy" type="text"  class="form-control searchVal" value="' + searchValueForColumn + '" />')
                            .appendTo(findTD.empty())
                            .on('keyup', function (event) {
                                if (event.keyCode === 13) {
                                    //var val = $.fn.dataTable.util.escapeRegex(
                                    //    $(this).val()
                                    //);
                                    var val = $(this).val();

                                    column
                                        .search(val ? val : '', true, true, false)
                                        .draw();
                                }
                            });
                    } 
                    else if (findTD.hasClass("comboCustomFilter")) {
                        var index = findTD.data('index');
                        var cnt = $('#customDtFilter' + index).html().trim();
                        select = $(cnt)
                            .appendTo(findTD.empty())
                            .on('change', function () {
                                var val = $(this).val();

                                column
                                    .search(val ? val : '', true, true, false)
                                    .draw();
                            });
                        select.val(searchValueForColumn);

                    }
                    columnIndex += 1;

                });
            },
            "drawCallback": function (settings) {
                if (drawCallback != null)
                    drawCallback();
            }
        });
}
