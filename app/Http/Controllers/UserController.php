<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    private $userService;

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    /**
     * ***********************************************
     * Method used to see users list
     * ***********************************************
     */
    public function index(Request $request)
    {
        //$users = User::find(4);
     // return $users->unread_notifications_count;


        if ($request->ajax()) {
            return $this->userService->userAjaxDatatable($request);
        }
        $userList = $this->userService->getAllUsers();
        return view('users.index', compact('userList'));
    }
}
