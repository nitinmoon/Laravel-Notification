$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$("document").ready(function() {
    $.validator.addMethod("alphanum", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z0-9\s]+$/);
    });
    $.validator.addMethod("alphanumsymbol", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z0-9-.+:;!*@#$%&_=|'"?,/()\s]+$/);
    });
    $.validator.addMethod("emailCheck", function( value, element ) {
        return this.optional( element ) || value == value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
    });

    $.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
   });

    $("#login-form").validate({
        rules: {
            email: {
                required: true,
                emailCheck: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 12
            }
        },
        messages: {
            email: {
                required: "Please enter email.",
                emailCheck: "Please enter a valid email address.",
            },
            password: {
                required: "Please enter password.",
            },
        },
        errorClass: "text-danger is-invalid",
        errorElement: "label",
        submitHandler: function() {
            var href = $('#login-form').attr('action');
            var serializeData = $('#login-form').serialize();
            $.ajax({
                type: 'POST',
                url: href,
                data: serializeData,
                beforeSend: function() {
                    $('#preloader').show();
                },
                success: function(res) {
                    if (res.status == true) {
                        window.location = res.redirectRoute;
                        $.notify({
                            message: res.msg
                        },{
                            type: 'success'
                        });
                    } else if(res.status == '2') {
                        $.notify({
                            message: res.msg
                        },{
                            type: 'danger'
                        });
                    } else if(res.status == '3') {
                        $('#l_error_email').html(res.msg)
                    } else {
                        $.notify({
                            message: res.msg
                        },{
                            type: 'danger'
                        });
                    }
                },
                complete: function() {
                    $('#preloader').hide();
                },
                error: function(err) {
                    $("#preloader").hide();
                    if (err.status == 422) {
                        $errResponse = JSON.parse(err.responseText);
                        $.each($errResponse.errors, function(key, value) {
                            console.log(key + "----" + value)
                            $("#l_error_" + key).html(value)
                        })

                    }
                }
            });
        }
    });

    $(".login-input").keypress(function() {
        $('#l_error_email').html('');
        $('#l_error_password').html('');
    });

    
 

    $('#phone, #c_phone').keypress(function(event){
        if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
        event.preventDefault();
    }});

    $('#sub_email').change(function() {
        $('#custom_error_email').html('');
    });

    $('#c_email').change(function() {
        $('#error_email').html('');
    });

    $("#signupPatientForm").validate({
        rules: {
            first_name: {
                required:true,
                minlength: 2,
                alpha:true,
            },
            last_name: {
                required:true,
                minlength: 1,
                alpha:true,
            },
            phone: {
                required: true,
                number:true,
                minlength: 10,
            },
            email: {
                required:true,
                emailCheck:true,
            },
            password: {
                required: true,
                alphanumsymbol: true,
                minlength: 6,
            },
            confirm_password: {
                required: true,
                alphanumsymbol: true,
                minlength: 6,
                equalTo: "#password",
            }
        },
        messages: {
            first_name: {
                required: "Please enter first name",
                alpha: "Please enter only characters",
            },
            last_name: {
                required: "Please enter last name",
                alpha: "Please enter only characters",
            },
            phone: {
                required: "Please enter phone number",
                number: "Please enter only digits",
                minlength: "Please enter at least 10 digit",
            },
            email: {
                required: "Please enter email",
                emailCheck: "Please enter valid email",
            },
            password: {
                required: "Please enter new password.",
                alphanumsymbol: "Please enter a valid new password.",
                minlength: "Password length must be greater than 6 characters."
            },
            confirm_password: {
                required: "Please enter confirm password.",
                alphanumsymbol: "Please enter a valid confirm password.",
                minlength: "Password length must be greater than 6 characters.",
                equalTo: "Confirm password should match with password."
            },
        },
        errorClass: "text-danger is-invalid",
        errorElement: "label",
        submitHandler: function(form) {
            $(".error").html('');
            var href = $('#signupPatientForm').attr('action');
            var formData = new FormData(form);
            $.ajax({
                type: 'POST',
                url: href,
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function() {
                    $('#preloader').show();
                },
                success: function(res) {
                    if (res.status == true) {
                        window.location = res.redirectRoute;
                        $.notify({
                            message: res.msg
                        }, {
                            type: 'success'
                        });
                    }
                },
                complete: function() {
                    $('#preloader').hide();
                },
                error: function(err) {
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
 