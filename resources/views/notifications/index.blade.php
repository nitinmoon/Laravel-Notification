@extends('layouts.app')
@section('content')
<div class="content">
    <div class="page-inner">
        <div class="page-header">
            <h4 class="page-title"><i class="fas fa-bell"></i> Notifications</h4>
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
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <button class="btn btn-primary btn-sm pull-right add-notification" title="Add New Notification" data-url="{{ route('notifications.add') }}"><i class="fas fa-plus"></i> Add New</button>
                            </div>
                        </div>
                            <div class="row lightgreywhilte p-2">
                                <div class="col-md-3 form-group">
                                    <label class="control-label">Select Type</label>
                                    <select class="form-control select2" id="type">
                                        <option value="">All</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="invoices">Invoices</option>
                                        <option value="system">System</option>
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
                        <input type="hidden" id="notificationRouteURL" value="{{ route('notifications.list') }}" />
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped notifications-table table-width-100">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Type</th>
                                        <th>Short Text</th>
                                        <th>Expired On</th>
                                        <th>Created At</th>
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
@include('notifications.notification-modal')
 
@endsection
@section('script')
    <script src="{{ asset('assets/js/custom-js/notification.js') }}"></script>
@endsection