$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {
    var table = $('.setting-list-tabel').DataTable({
        processing: true,
        serverSide: true,
        order: [[0, 'desc']],
        ajax: {
            url: $('#settingListUrl').val(),
            beforeSend: function() {
                $('#preloader').show();
            },
            data: function(d) {
            },
            complete: function() {
                $('#preloader').hide();
            }
        },
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex',orderable: false,searchable :false},
            {data: 'name', name: 'name', searchable: true},
            {data: 'value', name: 'value', searchable: true},
            {data: 'status', name: 'status'},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ]
    });

    //add setting
    $(document).on('click', '.add-setting', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#settingModal').modal('show');
                $('.modal-title').html('<i class="fas fa-plus" aria-hidden="true"></i> Add New Setting');
                $('#settingBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //edit patient
    $(document).on('click', '.edit-setting', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#settingModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit Setting');
                $('#settingBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //Change status
    $(document).on('change','.change_setting_status', function(e) {
        e.preventDefault();
        var status = $(this).is(":checked") ? 'Active' : 'Inactive';
        var settingId = $(this).attr('settingId');
        swal({
            title: 'Change Status!',
            text: "Are you sure you want to change it?",
            type: 'warning',
            buttons:{
                confirm: {
                    text : 'Yes, change it!',
                    className : 'btn btn-success'
                },
                cancel: {
                    visible: true,
                    text : "No, don't change it!",
                    className: 'btn btn-danger'
                }
            }
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: $('#settingChangeStatusUrl').val(),
                    method: 'POST',
                    data: {
                        status:status,
                        settingId:settingId
                    },
                    success: function(response) {
                        swal("Status changed successfully..", {
                            icon: "success",
                            buttons : {
                                confirm : {
                                    className: 'btn btn-success'
                                }
                            }
                        });
                        table.draw();
                    }
                });
            } else {
                table.draw();
            }
        })
    });
});