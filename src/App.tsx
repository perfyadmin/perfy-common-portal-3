import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import PerfyHome from "./pages/PerfyHome.tsx";
import PerfyAbout from "./pages/PerfyAbout.tsx";
import { SalesDialogController } from "@/components/SalesDialogController";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PerfyHome />} />
          <Route path="/about" element={<PerfyAbout />} />
          <Route path="/ecosystem" element={<Index />} />
          <Route path="/services" element={<Index />} />
          {/* Legacy aliases */}
          <Route path="/perfy" element={<PerfyHome />} />
          <Route path="/perfy/about" element={<PerfyAbout />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SalesDialogController />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
