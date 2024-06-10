$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(function () {
 

    var motificationTable = $('.notify-table').DataTable({
        processing: true,
        serverSide: true,
        order: [[0, 'desc']],
        ajax: {
            url: $("#NotifyRouteURL").val(),
            beforeSend: function () {
               // $('#preloader').show();
            },
            data: function (d) {
                d.type = $('#type').val();
                d.is_read = $('#is_read').val();
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
            { data: 'is_read', name: 'is_read', searchable: true },
            { data: 'read_at', name: 'read_at', searchable: true },
            { data: 'action', name: 'action', searchable: true }
          
        ]
    });
    $('.select2').select2();

    $("#resetNotify").on("click", function () {
        $("#is_read").val('').trigger('change');
        $("#type").val('').trigger('change');
        $('.notify-table').DataTable().ajax.reload();
    });

    $("#is_read, #type").change(function () {
        $('.notify-table').DataTable().ajax.reload();
    });

    //Edit user
    $(document).on('click', '.mark-read-notification', function(){
        var url = $(this).data("url");
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(res) {
                if (res.status == true) {
                    $(".common-count").html(res.unreadCount);
                    $('.notify-table').DataTable().ajax.reload();
                    $.notify({
                        message: res.msg
                    }, {
                        type: 'success'
                    });
                } else {
                    $.notify({
                        message: res.msg
                    }, {
                        type: 'danger'
                    });
                }
               
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

    // Define the function you want to run every 30 seconds
    function getLatestUnreadCount() {
        $.ajax({
            url: $("#LatestUnreadCountRouteURL").val(),
            dataType: 'json',
            success: function(res) {
                if (res.status == true) {
                    $(".common-count").html(res.unreadCount);
                    $('.notify-table').DataTable().ajax.reload();
                } 
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    }

    // Set the interval to 30 seconds (30000 milliseconds)
    setInterval(getLatestUnreadCount, 3000);

   
});

 