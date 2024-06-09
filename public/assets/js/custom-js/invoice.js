$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function() {

    //create invoice
    $(document).on('click', '.create-invoice', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#invoiceModal').modal('show');
                $('.modal-title').html('<i class="fas fa-plus" aria-hidden="true"></i> Create New Invoice');
                $('#invoiceBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //edit invoice
    $(document).on('click', '.edit-invoice', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#invoiceModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit Invoice');
                $('#invoiceBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    //delete invoice
    $(document).on('click', '.delete-invoice', function(e) {
        var url = $(this).data("url");
        swal({
            title: 'Delete Invoice!',
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
                        swal("Invoice deleted successfully.", {
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