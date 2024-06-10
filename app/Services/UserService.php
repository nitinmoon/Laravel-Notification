<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Request;
use Yajra\DataTables\DataTables;

class UserService
{
    /**
     * ******************************
     * Method used to get users list
     * ******************************
     */
    public function userAjaxDatatable($request)
    {
        $users = User::getUsers($request);

        return DataTables::of($users)
            ->addIndexColumn()
            ->addColumn(
                'name',
                function ($row) {
                    return '<a href="'.route('users.notifications', base64_encode($row->id)).'">'.$row->name.'</a>';
                }
            )
            ->addColumn(
                'email',
                function ($row) {
                    return $row->email;
                }
            )
            ->addColumn(
                'phone',
                function ($row) {
                    return isset($row->phone) ? $row->phone : '-';
                }
            )
            ->addColumn(
                'unreadNotificationCount',
                function ($row) {
                    $color = ($row->unread_notifications_count == 0) ? 'primary' : 'warning';
                    return '<span class="badge badge-' . $color . '">' . $row->unread_notifications_count . '</span>';
                }
            )
            ->addColumn(
                'notificationSwitch',
                function ($row) {
                    $color = ($row->status == 'On') ? 'success' : 'danger';
                    return '<span class="badge badge-' . $color . '">' . $row->status . '</span>';
                }
            )
            ->addColumn(
                'action',
                function ($row) {
                    return '<a class="btn btn-xs btn-round btn-info edit-user" title="Edit User" data-url="' . route('users.edit', $row->id) . '"><i class="fas fa-edit icon-size text-white"></i></a>';
                }
            )
            ->rawColumns(['name', 'unreadNotificationCount', 'notificationSwitch', 'action'])
            ->make(true);
    }

    /**
     * ******************************
     * Method used to get users list
     * ******************************
     */
    public function allUsers()
    {
        return User::getAllUsers();
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
    public function updateUserDetails($data, $userId)
    {
        return User::updateUser($data, $userId);
    }


    /**
     * ******************************************
     * Method used to get users notification list
     * ******************************************
     */
    public function userNotificationAjaxDatatable($request, $userId)
    {
        $data = User::getUserNotifications($request, $userId);
         
        return DataTables::of($data->notifications)
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
                'is_read',
                function ($row) {
                    $color = ($row->pivot->is_read == 'Yes') ? 'success' : 'warning';
                    return '<span class="badge badge-' . $color . '">' . $row->pivot->is_read . '</span>';
                }
            )
            ->addColumn(
                'read_at',
                function ($row) {
                    return isset($row->pivot->read_at) ? $row->pivot->read_at : '-';
                }
            )
            ->addColumn(
                'action',
                function ($row) {
                    $button = '';
                    if($row->pivot->is_read == 'No') {
                        $button .= '<a class="btn btn-xs btn-round btn-success text-white mark-read-notification" title="Mark As Read" data-url="'.route('notifications.read', $row->pivot->id) . '">Mark As Read</i></a>';
                    }
                    return $button;
                }
            )
            ->rawColumns(['is_read', 'action'])
            ->make(true);
    }


     /**
     * **************************************************
     * Method used to get unread notification count list
     * **************************************************
     */
    public function getUnreadData($userId)
    {
       return User::getUnreadNotificationCount($userId);

    }
}
