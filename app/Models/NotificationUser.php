<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationUser extends Model
{
    use HasFactory;

    protected $table = 'notification_user';
    public $timestamps = false;
    protected $fillable = [
        'notification_id',
        'user_id',
        'is_read',
        'read_at'
    ];

    
}
