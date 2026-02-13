import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

interface PhDClubSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const PhDClubSection = ({ formData, updateFormData }: PhDClubSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">PhD Club</h2>
        <a
          href="https://unitedforbetterpakistan.org/phd-club/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          What is PhD Club? <ExternalLink className="w-3 h-3" />
        </a>
        <p className="text-sm text-muted-foreground mt-2">
          Share your doctoral expertise to help build a better Pakistan.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phdExpertise">Area of PhD / Expertise</Label>
        <Input
          id="phdExpertise"
          placeholder="e.g. Artificial Intelligence, Molecular Biology, Public Policy..."
          value={formData.phdExpertise || ""}
          onChange={(e) => updateFormData({ phdExpertise: e.target.value })}
          className="bg-background"
        />
      </div>
    </div>
  );
};
