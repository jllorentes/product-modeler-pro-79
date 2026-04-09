import { useState } from "react";
import { Search, Link2, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { spmMockData, mockProducts } from "@/data/mockData";

interface Step1Props {
  spmId: string;
  setSpmId: (v: string) => void;
  qaProductId: string;
  setQaProductId: (v: string) => void;
  fetched: boolean;
  setFetched: (v: boolean) => void;
  cloneEnabled: boolean;
  setCloneEnabled: (v: boolean) => void;
  cloneSource: string;
  setCloneSource: (v: string) => void;
}

export function Step1SPMConnection({ spmId, setSpmId, qaProductId, setQaProductId, fetched, setFetched, cloneEnabled, setCloneEnabled, cloneSource, setCloneSource }: Step1Props) {
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {

    setLoading(true);
    setTimeout(() => { setFetched(true); setLoading(false); }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-1">SPM Connection</h3>
        <p className="text-sm text-muted-foreground">Link this product to its master data in Service Product Management.</p>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="spmId">SPM Product ID</Label>
          <Input id="spmId" placeholder="e.g. SPM-DE-10234" value={spmId} onChange={(e) => setSpmId(e.target.value)} className="mt-1.5" />
        </div>
        <div className="flex items-end">
          <Button onClick={handleFetch} disabled={!spmId || loading}>
            <Search className="mr-2 h-4 w-4" />{loading ? "Fetching..." : "Fetch Data"}
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="qaId" className="text-sm text-muted-foreground">QA Product ID (Optional, for testing purposes)</Label>
        <Input id="qaId" placeholder="e.g. QA-SPM-DE-10234" value={qaProductId} onChange={(e) => setQaProductId(e.target.value)} className="mt-1.5" />
      </div>

      <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
        <Switch checked={cloneEnabled} onCheckedChange={setCloneEnabled} />
        <div>
          <Label className="text-sm font-medium">Clone existing SSMP product configuration?</Label>
          <p className="text-xs text-muted-foreground">Copy billing and lifecycle rules from an existing product.</p>
        </div>
      </div>

      {cloneEnabled && (
        <Select value={cloneSource} onValueChange={setCloneSource}>
          <SelectTrigger><SelectValue placeholder="Select product to clone..." /></SelectTrigger>
          <SelectContent>
            {mockProducts.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name} ({p.globalId})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {fetched && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" /> SPM Data (Read-Only)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {Object.entries({
                "Product Name": spmMockData.name,
                "Provider": spmMockData.provider,
                "Cancel Period": spmMockData.cancelPeriod,
                "Category": spmMockData.productCategory,
                "Coverage": spmMockData.coverageType,
                "Max Claim": spmMockData.maxClaimValue,
              }).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
