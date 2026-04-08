import { useState } from "react";
import { Upload, CheckCircle2, AlertTriangle, FileSpreadsheet, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ExcelImportModalProps {
  open: boolean;
  onClose: () => void;
}

const validationResults = [
  { name: "PlusGuarantee 3Y DE", spmId: "SPM-DE-10260", status: "valid" as const },
  { name: "SmartProtect 2Y AT", spmId: "SPM-AT-20110", status: "valid" as const },
  { name: "Unknown Product X", spmId: "SPM-XX-99999", status: "error" as const, error: "SPM ID not found" },
];

export function ExcelImportModal({ open, onClose }: ExcelImportModalProps) {
  const [stage, setStage] = useState<"upload" | "validating" | "results">("upload");
  const [progress, setProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    startValidation();
  };

  const startValidation = () => {
    setStage("validating");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStage("results");
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  const handleConfirm = () => {
    toast.success("2 products imported successfully. 1 skipped due to errors.");
    handleClose();
  };

  const handleClose = () => {
    setStage("upload");
    setProgress(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Import Products from Excel
          </DialogTitle>
        </DialogHeader>

        {stage === "upload" && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={startValidation}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">Drop Excel file here to mass-create products</p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse files (.xlsx, .csv)</p>
          </div>
        )}

        {stage === "validating" && (
          <div className="py-8 space-y-4">
            <p className="text-sm text-muted-foreground text-center">Validating 50 products...</p>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">{progress}% complete</p>
          </div>
        )}

        {stage === "results" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Validation complete — 3 of 50 products shown below:</p>
            <div className="space-y-2">
              {validationResults.map((r, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-md border ${r.status === "valid" ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/50 border-red-200"}`}>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{r.spmId}</p>
                  </div>
                  {r.status === "valid" ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Ready to import
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-600">
                      <AlertTriangle className="h-4 w-4" /> {r.error}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm Import</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
