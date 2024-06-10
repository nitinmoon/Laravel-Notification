<?php

namespace App\Http\Controllers;

use App\Models\Constants\UserRoleConstants;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        if (auth()->user()->role_id == UserRoleConstants::USER) {
           
            return back()->with('error', 'You are not authorized to view this page!');;
        }
       return view('dashboard');
    }
}
