<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('_userr_table_', function (Blueprint $table) {
            //user name, password, user data, score and credit card
            $table->id();
            $table->string('username');
            $table->string('password');
            $table->mediumText('userdata');
            $table->integer('score');
            $table->integer('creditcard');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_userr_table_');
    }
};
