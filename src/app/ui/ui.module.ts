import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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


@NgModule({
  imports: [
    CommonModule,
    LeafletModule.forRoot(),
  ],
  declarations: [DashboardLayoutComponent, SidenavComponent, SearchBarComponent, ResultPanelComponent, SearchTimeComponent, SearchLocationComponent, SearchTagComponent, BannerComponent, CrowdmapComponent, PostsComponent]
})
export class UiModule { }
