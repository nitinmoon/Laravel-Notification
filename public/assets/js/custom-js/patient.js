$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {
    var table = $('.patient-table').DataTable({
        processing: true,
        serverSide: true,
        order: [[0, 'desc']],
        ajax: {
            url: $('#patientUrl').val(),
            beforeSend: function() {
                $('#preloader').show();
            },
            data: function(d) {
                d.is_deleted = $('#is_deleted').val();
            },
            complete: function() {
                $('#preloader').hide();
            }
        },
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex',orderable: false,searchable :false},
            {data: 'patient_name', name: 'patient_name', searchable: true},
            {data: 'patient_contact_no', name: 'patient_contact_no', searchable: true},
            {data: 'patient_email', name: 'patient_email', searchable: true},
            {data: 'action', name: 'action', orderable: false, searchable: false}
        ]
    });

    $('.select2').select2({
        minimumResultsForSearch: -1,
    });

    $('#is_deleted').on('change', function() {
        table.draw();
    })

    $("#reset").on("click", function () {
        $("#is_deleted").val('2').trigger('change');
        table.draw();
    });

    //add patient
    $(document).on('click', '.add-patient', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#patientModal').modal('show');
                $('.modal-title').html('<i class="fas fa-plus" aria-hidden="true"></i> Add New Patient');
                $('#patientBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //edit patient
    $(document).on('click', '.edit-patient', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#patientModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit Patient');
                $('#patientBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //delete patient
    $(document).on('click', '.delete-patient', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Delete Patient!',
            text: "Are you sure you want to delete it?",
            type: 'warning',
            buttons:{
                confirm: {
                    text : 'Yes, delete it!',
                    className : 'btn btn-success'
                },
                cancel: {
                    visible: true,
                    text : "No, don't delete it!",
                    className: 'btn btn-danger'
                }
            }
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(response) {
                        swal("Patient deleted successfully.", {
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
            }
        })
    });

    //restore patient
    $(document).on('click', '.restore-patient', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Restore Patient!',
            text: "Are you sure you want to restore it?",
            type: 'warning',
            buttons:{
                confirm: {
                    text : 'Yes, restore it!',
                    className : 'btn btn-success'
                },
                cancel: {
                    visible: true,
                    text : "No, don't restore it!",
                    className: 'btn btn-danger'
                }
            }
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(response) {
                        swal("Patient restored successfully.", {
                            icon: "success",
                            buttons : {
                                confirm : {
                                    className: 'btn btn-success'
                                }
                            }
                        });
                        $('.table').DataTable().ajax.reload();
                    }
                });
            }
        })
    });
});