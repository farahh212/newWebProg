<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;  // Add this import for Sanctum functionality

class Userr extends Model
{
    use HasApiTokens;  // Use Sanctum's HasApiTokens trait

    // Define the table name (if it's custom and not automatically inferred)
    protected $table = '_userr_table_';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'username',
        'password',
        'email',
        'creditcard',
    ];

    // Optionally, hide sensitive fields like password and credit card
    protected $hidden = [
        'password', 'creditcard',
    ];
}
