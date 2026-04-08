import { Database, Settings, DollarSign, Plug, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { spmMockData } from "@/data/mockData";
import type { PricingPeriod } from "./Step3Pricing";

interface Step5Props {
  spmId: string;
  firstPaymentPOS: boolean;
  businessModel: string;
  dunningProfile: string;
  reactivationPolicy: string;
  billingCompany: string;
  periods: PricingPeriod[];
  renewalAction: string;
  renewFromPeriod: string;
  workflow: string;
  provisioningSet: string;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm border-b border-border/50 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

export function Step5Summary(props: Step5Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-1">Summary</h3>
        <p className="text-sm text-muted-foreground">Review your configuration before publishing.</p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" /> SPM Master Data
            <Badge variant="secondary" className="text-[10px]">READ-ONLY</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryRow label="SPM ID" value={props.spmId} />
          <SummaryRow label="Product Name" value={spmMockData.name} />
          <SummaryRow label="Provider" value={spmMockData.provider} />
          <SummaryRow label="Is Recurring" value="Yes" />
          <SummaryRow label="Is B2B" value="No" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Settings className="h-4 w-4" /> SSMP Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryRow label="First Payment at POS" value={props.firstPaymentPOS ? "Yes" : "No"} />
          <SummaryRow label="Business Model" value={props.businessModel} />
          <SummaryRow label="Dunning Profile" value={props.dunningProfile} />
          <SummaryRow label="Reactivation Policy" value={props.reactivationPolicy} />
          <SummaryRow label="Billing Company" value={props.billingCompany} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Pricing Lifecycle
          </CardTitle>
        </CardHeader>
        <CardContent>
          {props.periods.map((p, i) => (
            <SummaryRow key={i} label={`Period ${i + 1}`} value={`€${p.price || "0.00"} / ${p.durationNumber} ${p.durationUnit}`} />
          ))}
          <SummaryRow label="After Last Period" value={props.renewalAction === "auto-renew" ? `Auto-renew from Period ${props.renewFromPeriod}` : "Terminate Contract"} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Plug className="h-4 w-4" /> Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryRow label="Workflow" value={props.workflow} />
          <SummaryRow label="Provisioning Set" value={props.provisioningSet} />
        </CardContent>
      </Card>
    </div>
  );
}
