import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";


import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";

import Bills from "./pages/Bills";

import Insights from "./pages/Insights";


export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      

      {/* PROTECTED ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} />
        
        <Route path="/bills" element={<Bills />} />
        
        <Route path="/insights" element={<Insights />} />
        
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
