@extends('layouts.app')
@section('content')
<div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title"><i class="fas fa-user"></i> User Notification - <span class="text-primary">{{ $userData->name }}</span></h4>
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
                                        <select class="form-control select2" id="type">
                                            <option value="">All</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="invoices">Invoices</option>
                                            <option value="system">System</option>
                                        </select>
                                </div>
                                <div class="col-md-3 form-group">
                                    <label class="control-label">Select Notification Status</label>
                                    <select class="form-control select2" id="is_read">
                                        <option value="">All</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                   </select>
                                </div>
                                <div class="col-md-2" style="margin-top: 41px;">
                                    <a class="btn btn-xs btn-secondary text-white" title="Reset" id="resetNotify">
                                        <i class="icon-refresh" aria-hidden="true"></i> Refresh
                                    </a>
                                </div>
                            </div>
                        </div>
                    
                    <div class="card-body">
                    <input type="hidden" id="NotifyRouteURL" value="{{ route('users.notifications', $userId) }}" />
                     
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped notify-table table-width-100">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Type</th>
                                        <th>Short Text</th>
                                        <th>Expired On</th>
                                        <th>Is Read</th>
                                        <th>Read On</th>
                                        <th>Action</th>
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
<script src="{{ asset('assets/js/custom-js/user-notify.js') }}"></script>
@endsection