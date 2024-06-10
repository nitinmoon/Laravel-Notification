<div class="sidebar sidebar-style-2">
	<div class="sidebar-wrapper scrollbar scrollbar-inner">
		<div class="sidebar-content">
			<div class="user">
				<div class="avatar-sm float-left mr-2">
					<img src="{{ asset('assets/img/default_profile.jpg') }}" alt="..."
						class="avatar-img rounded-circle">
				</div>
				<div class="info">
					<a href="#collapseExample">
						<span>
							{{ auth()->user()->name }}
							<span class="user-level">({{ auth()->user()->role->name }})</span>
						</span>
					</a>
					<div class="clearfix"></div>
				</div>
			</div>
			<ul class="nav nav-primary">
			 	<li class="nav-item {{ Request::routeIs('dashboard') ? 'active' : '' }}">
					<a href="{{ route('dashboard') }}">
						<i class="fas fa-home"></i>
						<p>Dashboard</p>
					</a>
				</li>
				<li class="nav-item {{ Request::routeIs('users.list') ? 'active' : '' }}">
					<a href="{{ route('users.list') }}">
						<i class="fas fa-user"></i>
						<p>Users</p>
					</a>
				</li>
				<li class="nav-item {{ Request::routeIs('notifications.list') ? 'active' : '' }}">
					<a href="{{ route('notifications.list') }}">
						<i class="fas fa-bell"></i>
						<p>Notifications</p>
					</a>
				</li>
		 	</ul>
		</div>
	</div>
</div>