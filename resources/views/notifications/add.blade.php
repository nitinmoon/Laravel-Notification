<div class="content">
    <form action="{{ route('notifications.save') }}" method="POST" name="notificationForm" id="notificationForm">
        @csrf
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label>Select Type <span class="errro">*</span></label>
                    <div>
                        <select class="form-control select2" name="type" id="mtype" style="width:100%"  data-placeholder="Select an option" data-error="#error_type">
                            <option></option>
                            <option value="marketing">Marketing</option>
                            <option value="invoices">Invoices</option>
                            <option value="system">System</option>
                        </select>
                        <span id="error_type" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Short Text  <span class="errro">*</span></label>
                    <div>
                       <input type="text" class="form-control" name="short_text" />
                        <span id="error_short_text" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Select User  <span class="errro">*</span></label>
                    <div> 
                        <select class="form-control select2" name="user_id" id="user_id" style="width:100%"  data-placeholder="Select an option" data-error="#error_user_id">
                            <option></option>
                            <option value="all">All</option>
                                @foreach($userList as $user)
                                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                                @endforeach
                        </select>
                        <span id="error_user_id" class="error"></span>
                    </div>

                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Expiration  <span class="errro">*</span></label>
                    <div>
                       <input type="datetime-local" class="form-control" name="expiration" min="{{ \Carbon\Carbon::now()->addMinute()->format('Y-m-d\TH:i') }}"/>
                        <span id="error_expiration" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <hr>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Add <i class="fas fa-arrow-alt-circle-right" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </form>
</div>
<script>
    $("document").ready(function () {
        $("#mtype").change(function() {
             $('#error_type').html('');
        });
        $("#user_id").change(function() {
            $('#error_user_id').html('');
        });
        $('.select2').select2();
        $.validator.addMethod("emailCheck", function (value, element) {
            return this.optional(element) || value == value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
        });
        $("#notificationForm").validate({
            rules: {
                type: {
                    required: true,
                     
                },
                short_text: {
                    required: true,
                    maxlength: 500
                },
                user_id: {
                    required: true,
                     
                },
                expiration: {
                    required: true,
                     
                },
            },
            messages: {
                type: {
                    required: "Please select type."
                },
                short_text: {
                    required: "Please enter short text.",
                    maxlength: "Please enter 500 characters.",
                },
                user_id: {
                    required: "Please select user."
                },
                expiration: {
                    required: "Please select expiration."
                }
            },
            errorElement: "label",
            errorPlacement: function(error, element) {
                var placement = $(element).data('error');
                if (placement) {
                $(placement).append(error)
                } else {
                error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                $("#from_date_error").html("");
                var href = $('#notificationForm').attr('action');
                var serializeData = $('#notificationForm').serializeArray();
                var formData = new FormData(form);
                $.ajax({
                    type: 'POST',
                    url: href,
                    data: formData,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        $("#preloader").show();
                    },
                    success: function (res) {
                        if (res.status == true) {
                            $('#notificationModal').modal('hide');
                            $('.notifications-table').DataTable().ajax.reload();
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
                    complete: function () {
                        $("#preloader").hide();
                    },
                    error: function (err) {
                        if (err.status == 422) {
                            $errResponse = JSON.parse(err.responseText);
                            $.each($errResponse.errors, function (key, value) {
                                console.log(key + "----" + value)
                                $("#error_" + key).html(value)
                                $.notify({
                                    message: value
                                }, {
                                    type: 'danger'
                                });
                            })

                        }
                    }
                });
            }
        });
    });
</script>