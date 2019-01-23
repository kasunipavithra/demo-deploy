import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultPanelComponent } from './result-panel/result-panel.component';
import { SearchTimeComponent } from './search-time/search-time.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchTagComponent } from './search-tag/search-tag.component';
import { BannerComponent } from './banner/banner.component';
import { CrowdmapComponent } from './crowdmap/crowdmap.component';
import { PostsComponent } from './posts/posts.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {SelectModule} from 'ng2-select';
import { NewpostComponent } from './newpost/newpost.component';
import { AppRoutingModule } from "../app.routing";
import { DropPinComponent } from './drop-pin/drop-pin.component';


//service imports
import { NewPostService } from '../services/new-post.service';
import { DemopostComponent } from './demopost/demopost.component';
import { SearchPanelLayoutComponent } from './search-panel-layout/search-panel-layout.component';
import { SearchpanelComponent } from './searchpanel/searchpanel.component';
import {DatePipe} from '@angular/common';
import { VendorsComponent } from './vendors/vendors.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginVendorComponent } from './login-vendor/login-vendor.component';
import { LoginNwsdbComponent } from './login-nwsdb/login-nwsdb.component';
import { LoginNonProfitComponent } from './login-non-profit/login-non-profit.component';
import { RotaractComponent } from './rotaract/rotaract.component';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    SelectModule
  ],
  declarations: [DashboardLayoutComponent,
    SidenavComponent,
    SearchBarComponent,
    ResultPanelComponent,
    SearchTimeComponent, 
    SearchLocationComponent,
    SearchTagComponent,
    BannerComponent, 
    CrowdmapComponent,
    PostsComponent,
    NewpostComponent, 
    DropPinComponent, DemopostComponent, SearchPanelLayoutComponent, SearchpanelComponent, VendorsComponent, ProfileComponent, LoginVendorComponent, LoginNwsdbComponent, LoginNonProfitComponent, RotaractComponent
  ],


    providers: [
      NewPostService,
      DatePipe
    ]
})
export class UiModule { }
