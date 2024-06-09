$(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //patient appointment table script
    var table = $('.patient-appointment').DataTable({
        processing: true,
        serverSide: true,
        order: [[0, 'desc']],
        ajax: {
            url: $("#patientUrl").val(),
            beforeSend: function() {
                $('#preloader').show();
            },
            data: function(d) {
                d.doctorId = $('#patient-doctor-search').val();
                d.patientAppMinDate = $('#patient-app-min-date').val();
                d.patientAppMaxDate = $('#patient-app-max-date').val();
                d.patientAppointmentStatus = $('#patientAppointmentStatus').val();
            },
            complete: function() {
                $('#preloader').hide();
            }
        },
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex',orderable: false,searchable :false},
            {data: 'doctor_name', name: 'doctor_name', searchable: true},
            {data: 'appointment_date', name: 'appointment_date', searchable: true},
            {data: 'time_slot', name: 'time_slot', searchable: true},
            {data: 'status', name: 'status', searchable: true},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ]
    });

    $('#patient-patient-search').on('change', function() {
        $('.patient-appointmentt').DataTable().ajax.reload();
    })
    $('#patient-doctor-search').on('change', function() {
        $('.patient-appointment').DataTable().ajax.reload();
    })
    $('#patientAppointmentStatus').on('change', function() {
        $('.patient-appointment').DataTable().ajax.reload();
    })

    $("body").on('DOMSubtreeModified', "#patientAppReportrange span", function() {
        setTimeout(() => {
            $('.patient-appointment').DataTable().ajax.reload();
        }, 500);
    });

    $("#patientResetBtn").on("click", function () {
        $("#patient-patient-search").empty();
        $("#patient-doctor-search").empty();
        $("#patientAppointmentStatus").val('').trigger('change');
        var currentMonth = (new Date()).getMonth();
        if (currentMonth > 2) {
            var thisYear = (new Date()).getFullYear();
            var nextYear = (new Date()).getFullYear() + 1;
            var startDate = new Date("4/1/" + thisYear);
            var endDate = new Date("3/31/" + nextYear);
        } else {
            var thisYear = (new Date()).getFullYear() - 1;
            var nextYear = (new Date()).getFullYear();
            var startDate = new Date("4/1/" + thisYear);
            var endDate = new Date("3/31/" + nextYear);
        }
        var start = moment(startDate.valueOf());
        var end = moment(endDate.valueOf());
        $('#patient-app-min-date').val(start.format('YYYY-MM-DD'));
        $('#patient-app-max-date').val(end.format('YYYY-MM-DD'));
        function cb(start, end) {
            $('#patientAppReportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
        cb(start, end);
    });

    // cancel appointment
    $(document).on('click', '.cancel-btn-appointment', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Are you sure?',
            text: "You want to cancel appointment!",
            type: 'warning',
            buttons:{
                confirm: {
                    text : 'Yes, cancel it!',
                    className : 'btn btn-success'
                },
                cancel: {
                    visible: true,
                    text : 'No, dont cancel!',
                    className: 'btn btn-danger'
                }
            }
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: url,
                    method: 'GET',
                    beforeSend: function() {
                        $("#preloader").show();
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            $.notify({
                                message: res.msg
                            },{
                                type: 'success'
                            });
                        } else {
                            $.notify({
                                message: res.msg
                            },{
                                type: 'danger'
                            });
                        }
                        $('.table').DataTable().ajax.reload();
                    },
                    complete: function() {
                        $("#preloader").hide();
                    },
                });
            }
        });
    });

    // complete appointment
    $(document).on('click', '.complete-btn-appointment', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Are you sure?',
            text: "You want to complete appointment!",
            type: 'warning',
            buttons:{
                confirm: {
                    text : 'Yes, complete it!',
                    className : 'btn btn-success'
                },
                cancel: {
                    visible: true,
                    text : 'No, dont complete!',
                    className: 'btn btn-danger'
                }
            }
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: url,
                    method: 'GET',
                    beforeSend: function() {
                        $("#preloader").show();
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            $.notify({
                                message: res.msg
                            },{
                                type: 'success'
                            });
                        } else {
                            $.notify({
                                message: res.msg
                            },{
                                type: 'danger'
                            });
                        }
                        $('.table').DataTable().ajax.reload();
                    },
                    complete: function() {
                        $("#preloader").hide();
                    },
                });
            }
        });
    });
});

// Pending appointment daterange filter
$(function() {
    var currentMonth = (new Date()).getMonth();
    if (currentMonth > 2) {
        var thisYear = (new Date()).getFullYear();
        var nextYear = (new Date()).getFullYear() + 1;
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    } else {
        var thisYear = (new Date()).getFullYear() - 1;
        var nextYear = (new Date()).getFullYear();
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    }
    var start = moment(startDate.valueOf());
    var end = moment(endDate.valueOf());
    $('#pending-app-min-date').val(start.format('YYYY-MM-DD'));
    $('#pending-app-max-date').val(end.format('YYYY-MM-DD'));

    function cb(start, end) {
        $('#pendingReportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#pendingReportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                'month').endOf('month')]
        }
    }, cb).on('apply.daterangepicker', function(e, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        $('#pending-app-min-date').val(startDate);
        $('#pending-app-max-date').val(endDate);
    });

    cb(start, end);
});

// upcoming appointment daterange filter
$(function() {
    var flag = $('#dashboardFlag').val();
    if (flag == 'tomorrow') {
        var date = (new Date()).getDate() + 1;
        var month = (new Date()).getMonth() + 1;
        var year = (new Date()).getFullYear();
        var tomorrowDate = new Date(month+'/'+date+'/'+year);
        var start = moment(tomorrowDate.valueOf());
        var end = moment(tomorrowDate.valueOf());
    } else {
        var currentMonth = (new Date()).getMonth();
        if (currentMonth > 2) {
            var thisYear = (new Date()).getFullYear();
            var nextYear = (new Date()).getFullYear() + 1;
            var startDate = new Date("4/1/" + thisYear);
            var endDate = new Date("3/31/" + nextYear);
        } else {
            var thisYear = (new Date()).getFullYear() - 1;
            var nextYear = (new Date()).getFullYear();
            var startDate = new Date("4/1/" + thisYear);
            var endDate = new Date("3/31/" + nextYear);
        }
        var start = moment(startDate.valueOf());
        var end = moment(endDate.valueOf());
    }
    $('#upcoming-app-min-date').val(start.format('YYYY-MM-DD'));
    $('#upcoming-app-max-date').val(end.format('YYYY-MM-DD'));

    function cb(start, end) {
        $('#upcomingReportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#upcomingReportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                'month').endOf('month')]
        }
    }, cb).on('apply.daterangepicker', function(e, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        $('#upcoming-app-min-date').val(startDate);
        $('#upcoming-app-max-date').val(endDate);
    });

    cb(start, end);
});

// Complete appointment daterange filter
$(function() {
    var currentMonth = (new Date()).getMonth();
    if (currentMonth > 2) {
        var thisYear = (new Date()).getFullYear();
        var nextYear = (new Date()).getFullYear() + 1;
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    } else {
        var thisYear = (new Date()).getFullYear() - 1;
        var nextYear = (new Date()).getFullYear();
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    }
    var start = moment(startDate.valueOf());
    var end = moment(endDate.valueOf());
    $('#complete-app-min-date').val(start.format('YYYY-MM-DD'));
    $('#complete-app-max-date').val(end.format('YYYY-MM-DD'));

    function cb(start, end) {
        $('#completeReportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#completeReportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                'month').endOf('month')]
        }
    }, cb).on('apply.daterangepicker', function(e, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        $('#complete-app-min-date').val(startDate);
        $('#complete-app-max-date').val(endDate);
    });

    cb(start, end);
});

// Cancel appointment daterange filter
$(function() {
    var currentMonth = (new Date()).getMonth();
    if (currentMonth > 2) {
        var thisYear = (new Date()).getFullYear();
        var nextYear = (new Date()).getFullYear() + 1;
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    } else {
        var thisYear = (new Date()).getFullYear() - 1;
        var nextYear = (new Date()).getFullYear();
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    }
    var start = moment(startDate.valueOf());
    var end = moment(endDate.valueOf());
    $('#cancel-app-min-date').val(start.format('YYYY-MM-DD'));
    $('#cancel-app-max-date').val(end.format('YYYY-MM-DD'));

    function cb(start, end) {
        $('#cancelReportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#cancelReportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                'month').endOf('month')]
        }
    }, cb).on('apply.daterangepicker', function(e, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        $('#cancel-app-min-date').val(startDate);
        $('#cancel-app-max-date').val(endDate);
    });

    cb(start, end);
});

// Patient appointment daterange filter
$(function() {
    var currentMonth = (new Date()).getMonth();
    if (currentMonth > 2) {
        var thisYear = (new Date()).getFullYear();
        var nextYear = (new Date()).getFullYear() + 1;
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    } else {
        var thisYear = (new Date()).getFullYear() - 1;
        var nextYear = (new Date()).getFullYear();
        var startDate = new Date("4/1/" + thisYear);
        var endDate = new Date("3/31/" + nextYear);
    }
    var start = moment(startDate.valueOf());
    var end = moment(endDate.valueOf());
    $('#patient-app-min-date').val(start.format('YYYY-MM-DD'));
    $('#patient-app-max-date').val(end.format('YYYY-MM-DD'));

    function cb(start, end) {
        $('#patientAppReportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#patientAppReportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                'month').endOf('month')]
        }
    }, cb).on('apply.daterangepicker', function(e, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        $('#patient-app-min-date').val(startDate);
        $('#patient-app-max-date').val(endDate);
    });

    cb(start, end);
});
