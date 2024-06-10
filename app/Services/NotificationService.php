<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Request;
use Yajra\DataTables\DataTables;

class NotificationService
{
    /**
     * ******************************
     * Method used to get users list
     * ******************************
     */
    public function notificationAjaxDatatable($request)
    {
        $notifications = Notification::getNotifications($request);
        
        return DataTables::of($notifications)
            ->addIndexColumn()
            ->addColumn(
                'type',
                function ($row) {
                    return ucfirst($row->type);
                }
            )
            ->addColumn(
                'short_text',
                function ($row) {
                    return strip_tags($row->short_text);
                }
            )
            ->addColumn(
                'expiration',
                function ($row) {
                    return isset($row->expiration) ? $row->expiration : '-';
                }
            )
            ->addColumn(
                'created_at',
                function ($row) {
                    return $row->created_at->diffForHumans();
                }
            )
            ->make(true);
    }

    /**
     * ******************************
     * Method used to get users list
     * ******************************
     */
    public function getTypes()
    {
        return Notification::getTypes('roles', 'name');
    }

    /**
     * ******************************
     * Method used to get users list
     * ******************************
     */
    public function userDetails($userId)
    {
        return User::getUserDetails($userId);
    }

    /**
     * ******************************
     * Method used to update user 
     * ******************************
     */
    public function saveNotification($data)
    {
        return Notification::saveNotification($data);
    }
}
