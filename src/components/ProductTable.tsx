import { MoreHorizontal, Eye, Copy, Settings, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/data/mockData";

interface ProductTableProps {
  products: Product[];
  onClone: (product: Product) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onStatusChange: (ids: string[], status: Product["status"]) => void;
}

const statusClass: Record<string, string> = {
  Active: "status-active",
  Draft: "status-draft",
  Archived: "status-archived",
};

export function ProductTable({ products, onClone, selectedIds, onSelectionChange, onStatusChange }: ProductTableProps) {
  const allSelected = products.length > 0 && products.every(p => selectedIds.includes(p.id));

  const toggleAll = () => {
    onSelectionChange(allSelected ? [] : products.map(p => p.id));
  };

  const toggleOne = (id: string) => {
    onSelectionChange(
      selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id]
    );
  };

  return (
    <div className="rounded-lg border bg-card">
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/5 border-b">
          <span className="text-sm font-medium">{selectedIds.length} selected</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-3.5 w-3.5" /> Change Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onStatusChange(selectedIds, "Active")}>Set Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(selectedIds, "Draft")}>Set Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(selectedIds, "Archived")}>Set Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" onClick={() => onSelectionChange([])}>Clear</Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10">
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead className="font-semibold">Global ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Provider</TableHead>
            <TableHead className="font-semibold text-right">Base Price</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No products found.</TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.id} className="group" data-state={selectedIds.includes(p.id) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox checked={selectedIds.includes(p.id)} onCheckedChange={() => toggleOne(p.id)} />
                </TableCell>
                <TableCell className="font-mono text-xs">{p.globalId}</TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell>{p.provider}</TableCell>
                <TableCell className="text-right font-mono">€{p.basePrice.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass[p.status]}`}>
                    {p.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onClone(p)}><Copy className="mr-2 h-4 w-4" />Use as Template</DropdownMenuItem>
                      <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Edit SSMP Config</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger><RefreshCw className="mr-2 h-4 w-4" />Change Status</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => onStatusChange([p.id], "Active")}>Set Active</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onStatusChange([p.id], "Draft")}>Set Draft</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onStatusChange([p.id], "Archived")}>Set Archived</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
