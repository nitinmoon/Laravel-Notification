<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = array(
            array('id' => 1, 'name' => "Admin"),
            array('id' => 2,'name' => "User"),
            );
        DB::table('roles')->insert($roles);
    }
}
