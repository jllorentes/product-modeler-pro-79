import { Database, Settings, DollarSign, Plug, Lock, FileSignature, Tag, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { spmMockData } from "@/data/mockData";
import type { PricingPeriod } from "./Step3Pricing";
import type { ScriveConfig } from "./Step5DigitalSignature";

interface Step6Props {
  spmId: string;
  qaProductId: string;
  firstPaymentPOS: boolean;
  businessModel: string;
  dunningProfile: string;
  reactivationPolicy: string;
  billingCompany: string;
  periods: PricingPeriod[];
  renewalAction: string;
  renewFromPeriod: string;
  trialDurationNumber: string;
  trialDurationUnit: string;
  workflow: string;
  provisioningSet: string;
  providerProductId: string;
  scriveConfig: ScriveConfig;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm border-b border-border/50 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

export function Step6Summary(props: Step6Props) {
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
          {props.qaProductId && <SummaryRow label="QA Product ID" value={props.qaProductId} />}
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
          {Number(props.trialDurationNumber) > 0 && (
            <SummaryRow label="Trial Period" value={`${props.trialDurationNumber} ${props.trialDurationUnit}`} />
          )}
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
          {props.providerProductId && <SummaryRow label="Provider Product ID" value={props.providerProductId} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileSignature className="h-4 w-4" /> Digital Signature (Scrive)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryRow label="Scrive Template ID" value={props.scriveConfig.templateId || "—"} />
          {props.scriveConfig.placeholders.length > 0 && (
            <SummaryRow label="Placeholders" value={props.scriveConfig.placeholders.filter(Boolean).join(", ") || "—"} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
