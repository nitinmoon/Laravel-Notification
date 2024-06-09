<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'short_text',
        'expiration	'
    ];

     // Define the many-to-many relationship with users
     public function users()
     {
        return $this->belongsToMany(User::class, 'notification_user');
     }
 
     // Scope to filter out expired notifications
    

   
}
