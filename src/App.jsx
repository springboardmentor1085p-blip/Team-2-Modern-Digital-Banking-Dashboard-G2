import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";
import Budgets from "./pages/Budgets";
import Rewards from "./pages/Rewards";
import FinAssist from "./pages/FinAssist";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<Register />} />
      {/* PROTECTED ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/finAssist" element={<FinAssist />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<HelpCenter />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
