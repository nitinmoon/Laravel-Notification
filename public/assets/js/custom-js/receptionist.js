$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {

    //add receptionist
    $(document).on('click', '.add-receptionist', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#receptionistModal').modal('show');
                $('.modal-title').html('<i class="fas fa-plus" aria-hidden="true"></i> Add New Receptionist');
                $('#receptionistBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //edit receptionist
    $(document).on('click', '.edit-receptionist', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#receptionistModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit Receptionist');
                $('#receptionistBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //delete receptionist
    $(document).on('click', '.delete-receptionist', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Delete Receptionist!',
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
                        swal("Receptionist deleted successfully.", {
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

    //restore receptionist
    $(document).on('click', '.restore-receptionist', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Restore Receptionist!',
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
                        swal("Receptionist restored successfully.", {
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