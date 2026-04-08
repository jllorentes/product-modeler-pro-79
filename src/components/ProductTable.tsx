import { useState } from "react";
import { MoreHorizontal, Eye, Copy, Settings } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/mockData";

interface ProductTableProps {
  products: Product[];
  onClone: (product: Product) => void;
}

const statusClass: Record<string, string> = {
  Active: "status-active",
  Draft: "status-draft",
  Archived: "status-archived",
};

export function ProductTable({ products, onClone }: ProductTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
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
              <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No products found.</TableCell>
            </TableRow>
          ) : (
            products.map((p) => (
              <TableRow key={p.id} className="group">
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
