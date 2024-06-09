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
                    return $row->name;
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
            ->rawColumns(['unreadNotificationCount', 'notificationSwitch', 'action'])
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
}
