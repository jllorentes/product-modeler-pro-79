import { Workflow, Server } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { workflowConfigurations, provisioningSets } from "@/data/mockData";

interface Step4Props {
  workflow: string;
  setWorkflow: (v: string) => void;
  provisioningSet: string;
  setProvisioningSet: (v: string) => void;
}

export function Step4Integration({ workflow, setWorkflow, provisioningSet, setProvisioningSet }: Step4Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-1">Integration & Provisioning</h3>
        <p className="text-sm text-muted-foreground">Connect workflows and provider APIs for this product.</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Workflow className="h-4 w-4 text-primary" />
            <Label className="font-medium">Workflow Configuration</Label>
          </div>
          <Select value={workflow} onValueChange={setWorkflow}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {workflowConfigurations.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 rounded-lg border space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Server className="h-4 w-4 text-primary" />
            <Label className="font-medium">Provider Provisioning Set</Label>
          </div>
          <Select value={provisioningSet} onValueChange={setProvisioningSet}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {provisioningSets.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
