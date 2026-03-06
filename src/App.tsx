import { lazy } from 'react';

// Lazy Load the Marketplace Module
const MarketplaceModule = lazy(() => import("./pages/boss-panel/marketplace/MarketplaceLayout"));

// ... existing imports and code

// BossPanel component
const BossPanel = () => {
    return (
        <Routes>
            {/* ... other routes */}
            <Route path="/boss-panel/marketplace" element={<RequireRole allowed={["boss_owner", "ceo", "product_manager", "marketing_manager", "sales_support", "pro_user", "basic_user"]}><MarketplaceModule /></RequireRole>} />
            {/* ... other routes */}
        </Routes>
    );
};

export default BossPanel;