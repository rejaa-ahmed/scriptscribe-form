import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { designations } from "@/data/formOptions";
import { ExternalLink } from "lucide-react";

interface CClubSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const CClubSection = ({ formData, updateFormData }: CClubSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">C-Club</h2>
        <a
          href="https://unitedforbetterpakistan.org/c-club/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          What is C-Club? <ExternalLink className="w-3 h-3" />
        </a>
        <p className="text-sm text-muted-foreground mt-2">
          For CEOs, CFOs, CIOs and corporate leaders ready to contribute.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Name of the Company</Label>
        <Input
          id="companyName"
          placeholder="Enter your company name"
          value={formData.companyName || ""}
          onChange={(e) => updateFormData({ companyName: e.target.value })}
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label>Designation</Label>
        <Select
          value={formData.designation || ""}
          onValueChange={(value) => updateFormData({ designation: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {designations.map((designation) => (
              <SelectItem key={designation} value={designation}>
                {designation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
