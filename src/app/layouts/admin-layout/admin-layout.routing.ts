import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

// Admin Components
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

// Client Components
import { ProductsComponent } from '../../components/products/products.component';

export const AdminLayoutRoutes: Routes = [
    // Admin routes
    { 
        path: 'ajouterproduit',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { requiresAdmin: true }
    },
    { 
        path: 'listesproduits',
        component: TableListComponent,
        canActivate: [AuthGuard],
        data: { requiresAdmin: true }
    },
    
    // Client routes
    { 
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: { requiresClient: true }
    },

    // Other routes (can be accessed by both roles)
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent }
];
