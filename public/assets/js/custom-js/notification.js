$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
    var table = $('.notifications-table').DataTable({
        processing: true,
        serverSide: true,
        order: [[0, 'desc']],
        ajax: {
            url: $("#notificationRouteURL").val(),
            beforeSend: function () {
                $('#preloader').show();
            },
            data: function (d) {
                d.type = $('#type').val();
            },
            complete: function () {
                $('#preloader').hide();
            }
        },
        columns: [
            { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
            { data: 'type', name: 'type', searchable: true },
            { data: 'short_text', name: 'short_text', searchable: true },
            { data: 'expiration', name: 'expiration', searchable: true },
            { data: 'created_at', name: 'created_at', orderable: false, searchable: false }
        ]
    });

    $('.select2').select2();

    $("#reset").on("click", function () {
        $("#type").val('').trigger('change');
        $('.notifications-table').DataTable().ajax.reload();
    });

    $("#type").change(function () {
        $('.notifications-table').DataTable().ajax.reload();
    });

    //Edit user
    $(document).on('click', '.add-notification', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                var data = res.body;
                $('#notificationModal').modal('show');
                $('.modal-title').html('<i class="fas fa-plus" aria-hidden="true"></i> Add Notification');
                $('#modalBody').html(data);
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });
});