<div class="content">
    <form action="{{ route('users.update', $userData->id) }}" method="POST" enctype="multipart/form-data"
        name="userForm" id="userForm">
        @csrf
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label>Name</label>
                    <div><input type="email" class="form-control" name="email" value="{{ isset($userData->name) ? $userData->name : '' }}" disabled />
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Email  <span class="errro">*</span></label>
                    <div><input type="email" class="form-control" name="email"
                            value="{{ isset($userData->email) ? $userData->email : '' }}" placeholder="Enter Email" />
                        <span id="error_email" class="error"></span>
                    </div>

                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Phone  <span class="errro">*</span></label>
                    <div><input type="text" class="form-control" name="phone"
                            value="{{ isset($userData->phone) ? $userData->phone : '' }}" placeholder="Enter Phone" />
                        <span id="error__phone" class="error"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Notification</label>
                    <div>
                        <input class='input-switch' type="checkbox" name="status" id="demo" {{ $userData->status == 'On' ? 'checked' : '' }} />
                        <label class="label-switch" for="demo"></label>
                        <span class="info-text"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <hr>
                <div class="form-group">
                    <input type="hidden" name="userId" value="{{ $userData->id }}" />
                    <button type="submit" class="btn btn-primary">Update <i class="fas fa-arrow-alt-circle-right" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </form>
</div>
<script>
    $("document").ready(function () {
        $.validator.addMethod("emailCheck", function (value, element) {
            return this.optional(element) || value == value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
        });
        $("#userForm").validate({
            rules: {
                email: {
                    required: true,
                    emailCheck: true,
                },
                phone: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                    number: true
                }   
            },
            messages: {
                email: {
                    required: "Please enter email.",
                    emailCheck: "Please enter a valid email address.",
                },
                phone: {
                    required: "Please enter phone.",
                    number: "Please enter only numbers.",
                    minlength: "Please enter 10 digit numbers.",
                    maxlength: "Please enter 10 digit numbers.",
                },

            },
            errorElement: "label",
            submitHandler: function (form) {
                $("#from_date_error").html("");
                var href = $('#userForm').attr('action');
                var serializeData = $('#userForm').serializeArray();
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
                            $('#userModal').modal('hide');
                            $('.users-table').DataTable().ajax.reload();
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
                        $.each($errResponse.errors, function(key, value) {
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
