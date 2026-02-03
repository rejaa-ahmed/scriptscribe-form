import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { expertTeams, naConstituencies } from "@/data/formOptions";

interface ContributionSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const ContributionSection = ({ formData, updateFormData }: ContributionSectionProps) => {
  const handleTeamToggle = (team: string) => {
    const currentTeams = formData.expertTeams || [];
    const newTeams = currentTeams.includes(team)
      ? currentTeams.filter((t: string) => t !== team)
      : [...currentTeams, team];
    updateFormData({ expertTeams: newTeams });
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-foreground">Become Part of Solution...</h2>

      {/* Join Expert Team */}
      <div className="space-y-3">
        <Label>Would you like to join our team of Global Experts?</Label>
        <RadioGroup
          value={formData.joinExperts || ""}
          onValueChange={(value) => updateFormData({ joinExperts: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="experts-yes" />
            <Label htmlFor="experts-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="experts-no" />
            <Label htmlFor="experts-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Team Selection */}
      {formData.joinExperts === "yes" && (
        <div className="space-y-3">
          <Label>Which team of experts would you like to join?</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expertTeams.map((team) => (
              <div key={team} className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors">
                <Checkbox
                  id={`team-${team}`}
                  checked={(formData.expertTeams || []).includes(team)}
                  onCheckedChange={() => handleTeamToggle(team)}
                />
                <Label htmlFor={`team-${team}`} className="font-normal cursor-pointer flex-1">
                  {team}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NA Constituency - Pakistani Residents */}
      <div className="space-y-2 pt-4 border-t border-border">
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
