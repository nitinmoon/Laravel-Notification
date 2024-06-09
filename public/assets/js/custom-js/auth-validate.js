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

    $(".f_input").keypress(function() {
        $('#forgot_error_email').html('');
    });

    $("#forgot-form").validate({
        rules: {
            email: {
                required: true,
                emailCheck: true,
            },
        },
        messages: {
            email: {
                required: "Please enter email.",
                emailCheck: "Please enter a valid email address.",
            },
        },
        errorClass: "text-danger is-invalid",
        errorElement: "label",
        submitHandler: function() {

            var href = $('#forgot-form').attr('action');
            var serializeData = $('#forgot-form').serialize();
            $('#submit').html('Sending Reset Link...');
            $.ajax({
                type: 'POST',
                url: href,
                data: serializeData,
                beforeSend: function() {
                    $('#preloader').show();
                },
                success: function(res) {
                    if (res.status == true) {
                        $('#submit').html('Email Password Reset Link');
                        $.notify({
                            message: res.msg
                        },{
                            type: 'success'
                        });
                    } else if(res.status == '2') {
                        $('#submit').html('Email Password Reset Link');
                        $.notify({
                            message: res.msg
                        },{
                            type: 'danger'
                        });
                    } else if(res.status == '1') {
                        $('#submit').html('Email Password Reset Link');
                        $('#forgot_error_email').html(res.msg)
                    } else {
                        $('#submit').html('Email Password Reset Link');
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
                    $('#submit').html('Email Password Reset Link');
                    if (err.status == 422) {
                        $errResponse = JSON.parse(err.responseText);
                        $.each($errResponse.errors, function(key, value) {
                            console.log(key + "----" + value)
                            $("#forgot_error_" + key).html(value)
                        })

                    }
                }
            });
        }
    });

    $("#reset-form").validate({
        rules: {
            email: {
                required: true,
                emailCheck: true,
            },
            password: {
                required: true,
                minlength: 6,
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#r_user_password",
            }
        },
        messages: {
            email: {
                required: "Please enter email.",
                emailCheck: "Please enter a valid email address.",
            },
            password: {
                required: "Please enter password.",
                minlength: "Password length must be greater than 6 characters.",
            },
            confirm_password: {
                required: "Please enter confirm password.",
                minlength: "Password length must be greater than 6 characters.",
                equalTo: "Confirm password should match with password.",
            },
        },
        errorClass: "text-danger is-invalid",
        errorElement: "label",
        submitHandler: function() {

            var href = $('#reset-form').attr('action');
            var serializeData = $('#reset-form').serialize();
            $("#preloader").show();
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
                            // options
                            message: res.msg
                        },{
                            // settings
                            type: 'success'
                        });
                    } else {
                        $.notify({
                            // options
                            message: res.msg
                        },{
                            // settings
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
                            $("#r_error_" + key).html(value)
                        })

                    }
                }
            });
        }
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

    //Unsubscribe Js
    $("#unsubscribe-form").validate({
        rules: {
            email: {
                required: true,
                emailCheck: true,
            },
        },
        messages: {
            email: {
                required: "Please enter email.",
                emailCheck: "Please enter a valid email address.",
            },
        },
        errorClass: "text-danger is-invalid",
        errorElement: "label",
        submitHandler: function(form) {
            $(".error").html('');
            var href = $('#unsubscribe-form').attr('action');
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
                        window.location = res.redirectUrl;
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
                        })

                    }
                }
            });
        }
    });
});

function loadFile(event) {
    $("#imageUplaoderro").html("");
    var image = document.getElementById("output");
    if ( /\.(jpeg|png|jpg)$/i.test(event.target.files[0].name) === false ) {
        $("#imageUplaoderro").html("Allow only jpg | jpeg | png format");
        $("#upload_img").addClass('d-none');
        $("#removeImg").addClass('d-none');
        return false;
    }
    if (event.target.files[0].size >= 2097152) {
        $("#imageUplaoderro").html("Profile image size must be less than 2 MB");
        image.src = URL.createObjectURL(event.target.files[0]);
        $("#upload_img").addClass('d-none');
        $("#removeImg").addClass('d-none');
        return false;
    }
        image.src = URL.createObjectURL(event.target.files[0]);
        $('#upload_img').removeClass('d-none');
        $('#removeImg').removeClass('d-none');
}