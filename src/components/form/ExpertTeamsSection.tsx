import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { expertTeams } from "@/data/formOptions";

interface ExpertTeamsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const ExpertTeamsSection = ({ formData, updateFormData }: ExpertTeamsSectionProps) => {
  const handleTeamToggle = (team: string) => {
    const currentTeams = formData.expertTeams || [];
    const newTeams = currentTeams.includes(team)
      ? currentTeams.filter((t: string) => t !== team)
      : [...currentTeams, team];
    updateFormData({ expertTeams: newTeams });
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-foreground">Expert Teams</h2>
      <p className="text-sm text-muted-foreground">
        Join a team of global experts working on key reform areas for Pakistan.
      </p>

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
    </div>
  );
};
