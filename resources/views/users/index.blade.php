@extends('layouts.app')
@section('content')
<div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title"><i class="fas fa-user"></i> Users</h4>
            <ul class="breadcrumbs">
                <li class="nav-home">
                    <a href="{{ route('dashboard') }}">
                        <i class="flaticon-home"></i> Dashboard
                    </a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    
                        <div class="card-header">
                            <div class="row lightgreywhilte p-2">
                                <div class="col-md-3 form-group">
                                    <label class="control-label">Select User</label>
                                    <select class="form-control select2" id="userId">
                                        <option value="">All</option>
                                        @foreach($userList as $user)
                                            <option value="{{ $user->id }}">{{ $user->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-2" style="margin-top: 41px;">
                                    <a class="btn btn-xs btn-secondary text-white" title="Reset" id="reset">
                                        <i class="icon-refresh" aria-hidden="true"></i> Refresh
                                    </a>
                                </div>
                            </div>
                        </div>
                    
                    <div class="card-body">
                        <input type="hidden" id="userRouteURL" value="{{ route('users.index') }}" />
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped users-table table-width-100">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th title="Unread Notifications Count">Unread <i class="fa fa-bell"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- data comes from server side datatables -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('script')
<script src="{{ asset('assets/js/custom-js/user.js') }}"></script>
@endsection