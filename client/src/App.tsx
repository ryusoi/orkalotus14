/*
 * Style reminder: This shell keeps the Aegean Riviera Editorial direction light-first,
 * with a switchable midnight navy theme and locale-aware document direction.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import { GlobalMediaZoomProvider } from "./components/GlobalMediaZoomProvider";
import AIConcierge from "./components/AIConcierge";
import Home from "./pages/Home";
import HotelDirectoryPage from "./pages/HotelDirectoryPage";
import RoomsServicesPage from "./pages/RoomsServicesPage";
import MedicalPage from "./pages/MedicalPage";
import ActivitiesSpaPage from "./pages/ActivitiesSpaPage";
import PoolsBeachPage from "./pages/PoolsBeachPage";
import WatersportsPage from "./pages/WatersportsPage";
import MiniClubPage from "./pages/MiniClubPage";
import RestaurantsBarsPage from "./pages/RestaurantsBarsPage";
import ShopsPage from "./pages/ShopsPage";
import ManagementPersonnelPage from "./pages/ManagementPersonnelPage";
import RankYourLotusPage from "./pages/RankYourLotusPage";
import IconBeachPage from "./pages/IconBeachPage";
import OrkaHomesPage from "./pages/OrkaHomesPage";
import MarmarisPage from "./pages/MarmarisPage";
import OrkaLegacyPage from "./pages/OrkaLegacyPage";
import ContactPage from "./pages/ContactPage";
import Assets from "./pages/Assets";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/hotel-directory" component={HotelDirectoryPage} />
      <Route path="/rooms-services" component={RoomsServicesPage} />
      <Route path="/rooms" component={RoomsServicesPage} />
      <Route path="/medical" component={MedicalPage} />
      <Route path="/activities-spa" component={ActivitiesSpaPage} />
      <Route path="/pools-beach" component={PoolsBeachPage} />
      <Route path="/watersports" component={WatersportsPage} />
      <Route path="/mini-club" component={MiniClubPage} />
      <Route path="/restaurants-bars" component={RestaurantsBarsPage} />
      <Route path="/shops" component={ShopsPage} />
      <Route path="/management-personnel" component={ManagementPersonnelPage} />
      <Route path="/management" component={ManagementPersonnelPage} />
      <Route path="/rank-your-lotus" component={RankYourLotusPage} />
      <Route path="/rankings" component={RankYourLotusPage} />
      <Route path="/orka-experience" component={RankYourLotusPage} />
      <Route path="/icon-beach" component={IconBeachPage} />
      <Route path="/orka-homes" component={OrkaHomesPage} />
      <Route path="/marmaris" component={MarmarisPage} />
      <Route path="/orka-legacy" component={OrkaLegacyPage} />
      <Route path="/heritage" component={OrkaLegacyPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/assets" component={Assets} />
      <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <LocaleProvider defaultLocale="en">
          <TooltipProvider>
            <GlobalMediaZoomProvider>
              <Toaster position="top-right" />
              <Router />
              <AIConcierge />
            </GlobalMediaZoomProvider>
          </TooltipProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
