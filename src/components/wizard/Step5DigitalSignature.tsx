import { Plus, Trash2, FileSignature } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PLACEHOLDER_OPTIONS = [
  "Contract ID",
  "First Name",
  "Last Name",
  "Address",
  "Email",
];

export interface ScriveConfig {
  templateId: string;
  placeholders: string[];
}

interface Step5Props {
  scriveConfig: ScriveConfig;
  setScriveConfig: (v: ScriveConfig) => void;
}

export function Step5DigitalSignature({ scriveConfig, setScriveConfig }: Step5Props) {
  const addPlaceholder = () => {
    setScriveConfig({
      ...scriveConfig,
      placeholders: [...scriveConfig.placeholders, ""],
    });
  };

  const updatePlaceholder = (i: number, value: string) => {
    const updated = [...scriveConfig.placeholders];
    updated[i] = value;
    setScriveConfig({ ...scriveConfig, placeholders: updated });
  };

  const removePlaceholder = (i: number) => {
    setScriveConfig({
      ...scriveConfig,
      placeholders: scriveConfig.placeholders.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-1">Digital Signature (Scrive)</h3>
        <p className="text-sm text-muted-foreground">Configure the e-signature template and map contract placeholders.</p>
      </div>

      <div className="p-4 rounded-lg border space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <FileSignature className="h-4 w-4 text-primary" />
          <Label className="font-medium">Scrive Template ID</Label>
        </div>
        <Input
          placeholder="e.g. scrive-tmpl-00421"
          value={scriveConfig.templateId}
          onChange={(e) => setScriveConfig({ ...scriveConfig, templateId: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Placeholder Mapping</Label>
        <p className="text-xs text-muted-foreground">Map standard variables to the Scrive contract template.</p>

        {scriveConfig.placeholders.map((ph, i) => (
          <Card key={i} className="border-l-4 border-l-primary">
            <CardContent className="py-3 flex items-center gap-3">
              <div className="flex-1">
                <Select value={ph} onValueChange={(v) => updatePlaceholder(i, v)}>
                  <SelectTrigger><SelectValue placeholder="Select placeholder..." /></SelectTrigger>
                  <SelectContent>
                    {PLACEHOLDER_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removePlaceholder(i)}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full border-dashed" onClick={addPlaceholder}>
          <Plus className="mr-2 h-4 w-4" /> Add Placeholder
        </Button>
      </div>
    </div>
  );
}
