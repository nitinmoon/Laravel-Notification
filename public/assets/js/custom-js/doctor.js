$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {

    //add doctor
    $(document).on('click', '.add-doctor', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#doctorModal').modal('show');
                $('.modal-title').html('<i class="fas fa-plus" aria-hidden="true"></i> Add New Doctor');
                $('#doctorBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //edit doctor
    $(document).on('click', '.edit-doctor', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#doctorModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit Doctor');
                $('#doctorBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //delete doctor
    $(document).on('click', '.delete-doctor', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Delete Doctor!',
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
                        swal("Doctor deleted successfully.", {
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

    //restore doctor
    $(document).on('click', '.restore-doctor', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Restore Doctor!',
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
                        swal("Doctor restored successfully.", {
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