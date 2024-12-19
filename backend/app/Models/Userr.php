<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Userr extends Model
{
    //
    protected $table='_userr_table_';
    protected $fillable= [ 'username', 'password', 'userdata', 'score', 'creditcard'];
}
