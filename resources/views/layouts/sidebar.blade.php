<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="{{ asset('assets/img/default_profile.jpg') }}" alt="..." class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a   href="#collapseExample"  >
								<span>
									Hizrian
									<span class="user-level">Administrator</span>
									 
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
					</ul>
				</div>
			</div>
		</div>