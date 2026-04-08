import { Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { dunningProfiles, reactivationPolicies, billingCompanies } from "@/data/mockData";

interface Step2Props {
  firstPaymentPOS: boolean;
  setFirstPaymentPOS: (v: boolean) => void;
  businessModel: string;
  setBusinessModel: (v: string) => void;
  dunningProfile: string;
  setDunningProfile: (v: string) => void;
  reactivationPolicy: string;
  setReactivationPolicy: (v: string) => void;
  billingCompany: string;
  setBillingCompany: (v: string) => void;
}

function SpmField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>Managed in SPM</TooltipContent>
        </Tooltip>
        <Label className="text-sm">{label}</Label>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function Step2BaseRules(props: Step2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-1">Subscription & Base Rules</h3>
        <p className="text-sm text-muted-foreground">Configure billing behavior and business rules.</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SPM Synced Data</p>
        <SpmField label="Is Recurring?" value="Yes" />
        <SpmField label="Is B2B?" value="No" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SSMP Configuration</p>

        <div className="flex items-center justify-between p-3 rounded-md border">
          <Label>First payment at POS?</Label>
          <Switch checked={props.firstPaymentPOS} onCheckedChange={props.setFirstPaymentPOS} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Business Model</Label>
            <Select value={props.businessModel} onValueChange={props.setBusinessModel}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Marketplace">Marketplace</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Dunning Profile</Label>
            <Select value={props.dunningProfile} onValueChange={props.setDunningProfile}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {dunningProfiles.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Reactivation Policy</Label>
            <Select value={props.reactivationPolicy} onValueChange={props.setReactivationPolicy}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {reactivationPolicies.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Billing Company</Label>
            <Select value={props.billingCompany} onValueChange={props.setBillingCompany}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {billingCompanies.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
