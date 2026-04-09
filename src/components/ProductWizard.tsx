import { useState } from "react";
import { ArrowLeft, ArrowRight, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./wizard/StepIndicator";
import { Step1SPMConnection } from "./wizard/Step1SPMConnection";
import { Step2BaseRules } from "./wizard/Step2BaseRules";
import { Step3Pricing, type PricingPeriod } from "./wizard/Step3Pricing";
import { Step4Integration } from "./wizard/Step4Integration";
import { Step5DigitalSignature, type ScriveConfig } from "./wizard/Step5DigitalSignature";
import { Step6Summary } from "./wizard/Step6Summary";
import { toast } from "sonner";

const STEPS = ["SPM Connection", "Base Rules", "Pricing", "Integration", "Digital Signature", "Summary"];

interface ProductWizardProps {
  onClose: () => void;
}

export function ProductWizard({ onClose }: ProductWizardProps) {
  const [step, setStep] = useState(0);

  // Step 1
  const [spmId, setSpmId] = useState("SPM-DE-10234");
  const [qaProductId, setQaProductId] = useState("");
  const [fetched, setFetched] = useState(false);
  const [cloneEnabled, setCloneEnabled] = useState(false);
  const [cloneSource, setCloneSource] = useState("");

  // Step 2
  const [firstPaymentPOS, setFirstPaymentPOS] = useState(false);
  const [businessModel, setBusinessModel] = useState("Retail");
  const [dunningProfile, setDunningProfile] = useState("Standard DE (3 Reminders)");
  const [reactivationPolicy, setReactivationPolicy] = useState("Allowed within 30 days");
  const [billingCompany, setBillingCompany] = useState("MediaMarkt Saturn DE");

  // Step 3
  const [periods, setPeriods] = useState<PricingPeriod[]>([
    { price: "0.00", durationNumber: "1", durationUnit: "Months" },
  ]);
  const [renewalAction, setRenewalAction] = useState("terminate");
  const [renewFromPeriod, setRenewFromPeriod] = useState("1");
  const [trialDurationNumber, setTrialDurationNumber] = useState("0");
  const [trialDurationUnit, setTrialDurationUnit] = useState("Months");

  // Step 4
  const [workflow, setWorkflow] = useState("Auto-approval + Welcome Email");
  const [provisioningSet, setProvisioningSet] = useState("Zurich API V2");
  const [providerProductId, setProviderProductId] = useState("");

  // Step 5
  const [scriveConfig, setScriveConfig] = useState<ScriveConfig>({ templateId: "", placeholders: [] });

  const handleSave = () => {
    toast.success("Product saved and published to SSMP successfully!", {
      description: `${spmId} — PlusGuarantee 5Y is now active.`,
    });
    onClose();
  };

  const lastStep = STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto">
      <div className="bg-card border rounded-xl shadow-xl w-full max-w-2xl my-8 mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create New Service Product</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        <div className="p-6 border-b bg-muted/30">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        <div className="p-6 min-h-[400px]">
          {step === 0 && <Step1SPMConnection {...{ spmId, setSpmId, qaProductId, setQaProductId, fetched, setFetched, cloneEnabled, setCloneEnabled, cloneSource, setCloneSource }} />}
          {step === 1 && <Step2BaseRules {...{ firstPaymentPOS, setFirstPaymentPOS, businessModel, setBusinessModel, dunningProfile, setDunningProfile, reactivationPolicy, setReactivationPolicy, billingCompany, setBillingCompany }} />}
          {step === 2 && <Step3Pricing {...{ periods, setPeriods, renewalAction, setRenewalAction, renewFromPeriod, setRenewFromPeriod, trialDurationNumber, setTrialDurationNumber, trialDurationUnit, setTrialDurationUnit }} />}
          {step === 3 && <Step4Integration {...{ workflow, setWorkflow, provisioningSet, setProvisioningSet, providerProductId, setProviderProductId }} />}
          {step === 4 && <Step5DigitalSignature scriveConfig={scriveConfig} setScriveConfig={setScriveConfig} />}
          {step === 5 && <Step6Summary {...{ spmId, qaProductId, firstPaymentPOS, businessModel, dunningProfile, reactivationPolicy, billingCompany, periods, renewalAction, renewFromPeriod, trialDurationNumber, trialDurationUnit, workflow, provisioningSet, providerProductId, scriveConfig }} />}
        </div>

        <div className="flex items-center justify-between p-4 border-t">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < lastStep ? (
            <Button onClick={() => setStep(step + 1)}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save and Publish to SSMP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
