<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationRequest;
use Illuminate\Http\Request;
use App\Services\NotificationService;
use App\Services\UserService;

class NotificationController extends Controller
{
    
    private $notificationService;
    private $userService;
    public function __construct(
        NotificationService $notificationService,
        UserService $userService
    ) {
        $this->notificationService = $notificationService;
        $this->userService = $userService;
    }

    /**
     * ***********************************************
     * Method used to see notifications list
     * ***********************************************
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            return $this->notificationService->notificationAjaxDatatable($request);
        }
        return view('notifications.index');
    }

    /**
     * ***********************************************
     * Method used to open notification add modal
     * ***********************************************
     */
    public function add()
    {
        $userList = $this->userService->allUsers();
        $html = view('notifications.add', compact('userList'))->render();
        return response()->json(array('body' => $html));
    }

    /**
     * ***********************************************
     * Method used to save the notification
     * ***********************************************
     */
    public function save(NotificationRequest $request)
    {
        try {
            $inputArray = $this->validateNotificationRequest($request);
            $this->notificationService->saveNotification($inputArray);
            return response()->json(
                [
                'status' => true,
                'msg'  => 'Notification Added Successfully'
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
    private function validateNotificationRequest(Request $request)
    {
        return $request->only(['type', 'short_text', 'user_id', 'expiration']);
    }

     /**
     * ***********************************************
     * Method used to mark as read notifications
     * ***********************************************
     */
    public function read(string $id)
    {   try {
            $data = $this->notificationService->updateNotification($id);
            $unreadNotification = $this->userService->getUnreadData(base64_encode($data->user_id));
            return response()->json(
                [
                'status' => true,
                'msg'  => 'Status Updated Successfully',
                'unreadCount' => count($unreadNotification->notifications)
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
}
