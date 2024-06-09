<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;

class LoginController extends Controller
{
    private $userService;

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    /**
     * *********************************
     * Method used to view login page
     * ---------------------------------
     * *********************************
     */
    public function index()  
    {
        if (Auth::check()) {
            return back();
        }
        return view('auth.login');
    }

    /**
     * **********************************
     * Method used to check user login
     * ----------------------------------
     * **********************************
     */
    public function checkLogin(LoginRequest $request)
    {
        $credentials = $this->validateLoginRequest($request);
     
        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            return response()->json(
                [
                'status' => true,
                'redirectRoute' => route('dashboard'),
                'msg' => 'Login successfully!'
                ]
            );
        }
        return response()->json(
            [
            'status' => '3',
            'msg' => 'Credentials are not matched!',
            ]
        );
    }

    /**
     * ***********************************************
     * Method used to get required input for login
     * ***********************************************
     */
    private function validateLoginRequest(Request $request)
    {
        return $request->only(['email', 'password']);
    }

    /**
     * *************************
     * method used to logout
     * -------------------------
     * **************************
     */
    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}
