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
import { NewpostComponent } from './newpost/newpost.component';
import { AppRoutingModule } from "../app.routing";
import { DropPinComponent } from './drop-pin/drop-pin.component';


//service imports
import { NewPostService } from '../services/new-post.service';
import { DemopostComponent } from './demopost/demopost.component';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule.forRoot(),
    AppRoutingModule,
    FormsModule
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
    DropPinComponent, DemopostComponent
  ],


    providers: [
      NewPostService
    ]
})
export class UiModule { }
