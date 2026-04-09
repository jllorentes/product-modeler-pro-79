import { useState, useMemo } from "react";
import { Plus, Upload, Download, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductTable } from "@/components/ProductTable";
import { ProductWizard } from "@/components/ProductWizard";
import { ExcelImportModal } from "@/components/ExcelImportModal";
import { mockProducts as initialProducts, countries } from "@/data/mockData";
import type { Product } from "@/data/mockData";

export default function Index() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.globalId.toLowerCase().includes(search.toLowerCase());
      const matchCountry = countryFilter === "all" || p.country === countryFilter;
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchSearch && matchCountry && matchStatus;
    });
  }, [search, countryFilter, statusFilter, products]);

  const handleStatusChange = (ids: string[], status: Product["status"]) => {
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status } : p));
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight">SSMP Product Modeler</span>
          </div>
          <div className="text-xs text-muted-foreground">v2.4.1 · Staging</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Service Products</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{products.length} products configured</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setImportOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Import Excel
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button onClick={() => setWizardOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Product
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Country" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProductTable
          products={filtered}
          onClone={() => setWizardOpen(true)}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onStatusChange={handleStatusChange}
        />
      </main>

      {wizardOpen && <ProductWizard onClose={() => setWizardOpen(false)} />}
      <ExcelImportModal open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
