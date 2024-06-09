$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    var table = $('.users-table').DataTable({
        processing: true,
        serverSide: true,
        order: [[0, 'desc']],
        ajax: {
            url: $("#userRouteURL").val(),
            beforeSend: function () {
                $('#preloader').show();
            },
            data: function (d) {
                d.userId = $('#userId').val();
            },
            complete: function () {
                $('#preloader').hide();
            }
        },
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
            { data: 'name', name: 'name', searchable: true },
            { data: 'email', name: 'email', searchable: true },
            { data: 'phone', name: 'phone', searchable: true },
            { data: 'unreadNotificationCount', name: 'unreadNotificationCount', searchable: true },
            { data: 'notificationSwitch', name: 'notificationSwitch', searchable: true },
            { data: 'action', name: 'action', orderable: false, searchable: false }
        ]
    });

    $('.select2').select2();

    $("#reset").on("click", function () {
        $("#userId").val('').trigger('change');
        $('.users-table').DataTable().ajax.reload();
    });

    $("#userId").change(function () {
        $('.users-table').DataTable().ajax.reload();
    });

    //Edit user
    $(document).on('click', '.edit-user', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#userModal').modal('show');
                $('.modal-title').html('<i class="fas fa-edit" aria-hidden="true"></i> Edit User');
                $('#modalBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });
});