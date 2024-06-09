$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {

    //Add Leave
    $(document).on('click', '.apply-leave', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#leaveModal').modal('show');
                $('.modal-title').html('<i class="fa fa-plus" aria-hidden="true"></i> Apply for Leaves');
                $('#leaveBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //Edit Leave
    $(document).on('click', '.edit-leave', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#leaveModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit Leaves');
                $('#leaveBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //View Leave
    $(document).on('click', '.view-leave', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#leaveModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> View Leave Detail');
                $('#leaveBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //delete Leave
    $(document).on('click', '.delete-leave', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Delete Leave!',
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
                        swal("Leave deleted successfully.", {
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