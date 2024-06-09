<?php

namespace App\Models;

use App\Models\Constants\UserRoleConstants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'phone',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    
    /**
     * ********************************************************
     * Define the role relationship with user
     * ********************************************************
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
     
    /**
     * ********************************************************
     * Define the many-to-many relationship with notifications
     * ********************************************************
     */
    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'notification_user')
            ->withPivot('is_read');

    }

    /**
     * ************************************
     * Accessor for unread notifications count
     * ************************************
     */
    public function getUnreadNotificationsCountAttribute()
    {
        return $this->notifications()
            ->wherePivot('is_read', 'No')
            ->where('expiration', '>', now())
            ->count();
    }

    /**
     * ************************************
     * define condition only for role user
     * ************************************
     */
    public function scopeInuser($query)
    {
        return $query->where('role_id', '=', UserRoleConstants::USER);
    }
 
    /**
     * ********************************
     * get user listing for datatables
     * ********************************
     */
    public static function getUsers($request)
    {
        $users = User::withCount('notifications')->inUser()->select(
            [
                'id',
                'name',
                'email',
                'phone',
                'status'
            ]
        );
        if ($request->userId != "") {
            $users->where('id', $request->userId);
        }
        return $users->orderBy('id', 'desc')->get();
    }

    /**
     * ******************************
     * get user listing
     * ******************************
     */
    public static function getAllUsers()
    {
        $users = User::inUser()->select(
            [
                'id',
                'name'
            ]
        );
        return $users->orderBy('name', 'asc')->get();
    }

    /**
     * ******************************
     * get user details
     * ******************************
     */
    public static function getUserDetails($userId)
    {
       return User::find($userId);
    }
    
    /**
     * ******************************
     * Method used to update user
     * ******************************
     */
    public static function updateUser($data, $userId)
    {
        return User::where('id', $userId)->update(
            [
                'email' => $data['email'],
                'phone' => $data['phone'],
                'status' => isset($data['status']) ? 'On' : 'Off'
            ]
        );
    }
}
