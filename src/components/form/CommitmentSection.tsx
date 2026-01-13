import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface CommitmentSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const CommitmentSection = ({ formData, updateFormData }: CommitmentSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-foreground">I Want to Be Part of the Solution</h2>

      {/* Part of Solution */}
      <div className="space-y-3">
        <Label>Are you ready to be part of the solution for a better Pakistan?</Label>
        <RadioGroup
          value={formData.partOfSolution || ""}
          onValueChange={(value) => updateFormData({ partOfSolution: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="solution-yes" />
            <Label htmlFor="solution-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="solution-no" />
            <Label htmlFor="solution-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Skills and Experience */}
      <div className="space-y-2">
        <Label htmlFor="skills">What skills and experience can you contribute?</Label>
        <Textarea
          id="skills"
          placeholder="Describe your skills, experience, and how you can contribute to building a better Pakistan..."
          value={formData.skills || ""}
          onChange={(e) => updateFormData({ skills: e.target.value })}
          className="bg-white min-h-[120px]"
        />
      </div>

      {/* Time Commitment */}
      <div className="space-y-3">
        <Label>How much time can you dedicate per week?</Label>
        <RadioGroup
          value={formData.timeCommitment || ""}
          onValueChange={(value) => updateFormData({ timeCommitment: value })}
          className="flex flex-wrap gap-3"
        >
          {["1-2 hours", "3-5 hours", "5-10 hours", "10+ hours"].map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <RadioGroupItem value={time} id={`time-${time}`} />
              <Label htmlFor={`time-${time}`} className="font-normal cursor-pointer">{time}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Referral */}
      <div className="space-y-2">
        <Label htmlFor="referral">How did you hear about us?</Label>
        <Input
          id="referral"
          placeholder="Friend, social media, website, etc."
          value={formData.referral || ""}
          onChange={(e) => updateFormData({ referral: e.target.value })}
          className="bg-white"
        />
      </div>

      {/* Additional Comments */}
      <div className="space-y-2">
        <Label htmlFor="comments">Additional Comments or Suggestions</Label>
        <Textarea
          id="comments"
          placeholder="Any additional comments or suggestions for United for Better Pakistan..."
          value={formData.comments || ""}
          onChange={(e) => updateFormData({ comments: e.target.value })}
          className="bg-white min-h-[100px]"
        />
      </div>
    </div>
  );
};
