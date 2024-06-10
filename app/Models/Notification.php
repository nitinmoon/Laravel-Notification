<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use DB;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'short_text',
        'expiration'
    ];

    // Define the many-to-many relationship with users
    public function users()
    {
        return $this->belongsToMany(User::class, 'notification_user');
    }
 
    // Scope to filter out expired notifications

    public function scopeNotExpired($query)
    {
        return $query->where('expiration', '>', Carbon::now());
    }

    /**
     * *****************************************
     * get notification listing for datatables
     * *****************************************
     */
    public static function getNotifications($request)
    {
        $data = Notification::notExpired()->select(
            [
                'id',
                'type',
                'short_text',
                'expiration',
                'created_at'
            ]
        );
        if ($request->type != "") {
            $data->where('type', $request->type);
        }
        return $data->orderBy('id', 'desc')->get();
    }

    /**
     * *********************************************
     * Method used to add notification
     * Retrieve the ID of the newly inserted record
     * Save the data into notification users table
     * *********************************************
     */
    public static function saveNotification($data)
    { 
        $dateTime = new \DateTime($data['expiration']);
        $model =  Notification::create([
                    'type' => $data['type'],
                    'short_text' => $data['short_text'],
                    'expiration' =>  $dateTime->format('Y-m-d H:i:s'),
                ]);
        $insertedId = $model->id;
        if ($data['user_id'] == 'all') {
                $userId = User::inUser()->pluck('id');
        } else {
               $userId = $data['user_id'];
        }
        $model->users()->attach($userId);
        return $insertedId;
    }
      
}
