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
                    $color = ($row->unread_notifications_count == 0) ? 'success' : 'warning';
                    return '<span class="badge badge-'.$color.'">'. $row->unread_notifications_count.'</span>';
                }
            )
            ->rawColumns(['unreadNotificationCount'])
            ->make(true);
    }

    /**
     * ******************************
     * Method used to get users list
     * ******************************
     */
    public function getAllUsers()
    {
       return User::getAllUsers();
    }
        
        
    
}
