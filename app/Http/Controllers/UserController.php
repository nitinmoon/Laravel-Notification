<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Constants\UserRoleConstants;
use App\Models\Notification;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
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
        if (auth()->user()->role_id == UserRoleConstants::USER) {
            return back()->with('error', 'You are not authorized to view this page!');;
        }
        if ($request->ajax()) {
            return $this->userService->userAjaxDatatable($request);
        }
        $userList = $this->userService->allUsers();
        return view('users.index', compact('userList'));
    }

    /**
     * ***********************************************
     * Method used to open user edit modal
     * ***********************************************
     */
    public function edit(string $userId)
    {
        $userData = $this->userService->userDetails($userId);
        $html = view('users.edit', compact('userData'))->render();
        return response()->json(array('body' => $html));
    }

    /**
     * ***********************************************
     * Method used to update the user details
     * ***********************************************
     */
    public function update(UserRequest $request, string $id)
    {
        try {
            $inputArray = $this->validateUserRequest($request);
            $this->userService->updateUserDetails($inputArray, $id);
            return response()->json(
                [
                'status' => true,
                'msg'  => 'User Updated Successfully'
                ]
            );
        } catch (\Exception $exception) {
            return response()->json(
                [
                'status' => false,
                'msg' => $exception->getMessage()
                ]
            );
        }
    }

    /**
     * ***********************************************
     * Method used to validate request
     * ***********************************************
     */
    private function validateUserRequest(Request $request)
    {
        return $request->only(['email', 'phone', 'status']);
    }

    /**
     * ***********************************************
     * Method used to see users list
     * ***********************************************
     */
    public function userNotification(Request $request, string $userId)
    {     
        $userData = $this->userService->userDetails(base64_decode($userId));
        if ($userData == '') {
            return back()->with('error', 'This is not valid user!');;
        }
        if ($request->ajax()) {
            return $this->userService->userNotificationAjaxDatatable($request, $userId);
        }
        $userData = $this->userService->userDetails(base64_decode($userId));
        $unreadNotification = $this->userService->getUnreadData($userId);
        return view('users.user-notification', compact('userId', 'userData', 'unreadNotification'));
    }
    
}
