import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { naConstituencies } from "@/data/formOptions";

interface ConstituencySectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const ConstituencySection = ({ formData, updateFormData }: ConstituencySectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-foreground">Constituency Corner</h2>
      <p className="text-sm text-muted-foreground">
        Select your constituency to help where it matters most.
      </p>

      {/* NA Constituency - Pakistani Residents */}
      <div className="space-y-2">
        <Label>Which NA Constituency do you currently live in?</Label>
        <p className="text-sm text-muted-foreground">(Only for Pakistani residents)</p>
        <Select
          value={formData.currentConstituency || ""}
          onValueChange={(value) => updateFormData({ currentConstituency: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {naConstituencies.map((constituency) => (
              <SelectItem key={constituency} value={constituency}>
                {constituency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Urban NA Constituency - Overseas Pakistanis */}
      <div className="space-y-2">
        <Label>Which Urban NA Constituency would you like to help in?</Label>
        <p className="text-sm text-muted-foreground">(Only for Overseas Pakistanis)</p>
        <Select
          value={formData.urbanConstituency || ""}
          onValueChange={(value) => updateFormData({ urbanConstituency: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {naConstituencies.map((constituency) => (
              <SelectItem key={constituency} value={constituency}>
                {constituency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rural NA Constituency */}
      <div className="space-y-2">
        <Label>Which Rural NA Constituency would you like to help in?</Label>
        <p className="text-sm text-muted-foreground">(Only for Overseas Pakistanis)</p>
        <Select
          value={formData.ruralConstituency || ""}
          onValueChange={(value) => updateFormData({ ruralConstituency: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {naConstituencies.map((constituency) => (
              <SelectItem key={constituency} value={constituency}>
                {constituency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
