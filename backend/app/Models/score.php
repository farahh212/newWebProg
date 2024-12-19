<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class score extends Model
{
    //
    protected $table='score';
    protected $fillable= [  'name', 'username', 'score'];
}

//user id, name, user name, score