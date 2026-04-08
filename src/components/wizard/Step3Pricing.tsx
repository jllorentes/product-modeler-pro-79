import { Plus, Trash2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface PricingPeriod {
  price: string;
  durationNumber: string;
  durationUnit: string;
}

interface Step3Props {
  periods: PricingPeriod[];
  setPeriods: (v: PricingPeriod[]) => void;
  renewalAction: string;
  setRenewalAction: (v: string) => void;
  renewFromPeriod: string;
  setRenewFromPeriod: (v: string) => void;
}

export function Step3Pricing({ periods, setPeriods, renewalAction, setRenewalAction, renewFromPeriod, setRenewFromPeriod }: Step3Props) {
  const addPeriod = () => setPeriods([...periods, { price: "", durationNumber: "1", durationUnit: "Months" }]);
  const removePeriod = (i: number) => setPeriods(periods.filter((_, idx) => idx !== i));
  const updatePeriod = (i: number, field: keyof PricingPeriod, value: string) => {
    const updated = [...periods];
    updated[i] = { ...updated[i], [field]: value };
    setPeriods(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-1">Pricing & Validity Periods</h3>
        <p className="text-sm text-muted-foreground">Define the pricing lifecycle for this subscription product.</p>
      </div>

      <div className="space-y-3">
        {periods.map((p, i) => (
          <Card key={i} className="border-l-4 border-l-primary">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Period {i + 1}</CardTitle>
              {periods.length > 1 && (
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removePeriod(i)}>
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Price (€)</Label>
                  <Input className="mt-1" type="number" step="0.01" placeholder="0.00" value={p.price} onChange={(e) => updatePeriod(i, "price", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Duration</Label>
                  <Input className="mt-1" type="number" min="1" placeholder="1" value={p.durationNumber} onChange={(e) => updatePeriod(i, "durationNumber", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Unit</Label>
                  <Select value={p.durationUnit} onValueChange={(v) => updatePeriod(i, "durationUnit", v)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Months">Months</SelectItem>
                      <SelectItem value="Years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full border-dashed" onClick={addPeriod}>
          <Plus className="mr-2 h-4 w-4" /> Add Next Period
        </Button>
      </div>

      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-primary" /> Renewal Configuration (End of lifecycle)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">What happens after the last period?</Label>
            <Select value={renewalAction} onValueChange={setRenewalAction}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="terminate">Terminate Contract</SelectItem>
                <SelectItem value="auto-renew">Auto-renew indefinitely</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {renewalAction === "auto-renew" && (
            <div>
              <Label className="text-xs">Repeat from Period</Label>
              <Select value={renewFromPeriod} onValueChange={setRenewFromPeriod}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {periods.map((_, i) => (
                    <SelectItem key={i} value={String(i + 1)}>Period {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
