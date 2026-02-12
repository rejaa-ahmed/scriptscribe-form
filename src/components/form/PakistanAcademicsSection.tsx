import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pakistanDegrees, graduationYears, pakistanUniversities } from "@/data/formOptions";
import { ExternalLink } from "lucide-react";

interface PakistanAcademicsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const PakistanAcademicsSection = ({ formData, updateFormData }: PakistanAcademicsSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Your Academics in Pakistan</h2>
        <a 
          href="https://unitedforbetterpakistan.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          Why we are asking your educational info? <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Student Status */}
      <div className="space-y-3">
        <Label>Are you a Student?</Label>
        <RadioGroup
          value={formData.isStudent || ""}
          onValueChange={(value) => updateFormData({ isStudent: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="student-yes" />
            <Label htmlFor="student-yes" className="font-normal cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="student-no" />
            <Label htmlFor="student-no" className="font-normal cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Highest Degree */}
      <div className="space-y-2">
        <Label>Highest Degree in Pakistan</Label>
        <Select
          value={formData.pakistanDegree || ""}
          onValueChange={(value) => updateFormData({ pakistanDegree: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {pakistanDegrees.map((degree) => (
              <SelectItem key={degree} value={degree}>
                {degree}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* University */}
      <div className="space-y-2">
        <Label>University/College</Label>
        <Select
          value={formData.pakistanUniversity || ""}
          onValueChange={(value) => updateFormData({ pakistanUniversity: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-popover z-50">
            {pakistanUniversities.map((uni) => (
              <SelectItem key={uni} value={uni}>
                {uni}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Department */}
      <div className="space-y-2">
        <Label htmlFor="pakistanDepartment">Department</Label>
        <Input
          id="pakistanDepartment"
          placeholder="Enter your department"
          value={formData.pakistanDepartment || ""}
          onChange={(e) => updateFormData({ pakistanDepartment: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Graduation Year */}
      <div className="space-y-2">
        <Label>Year Graduated or Expected to Graduate</Label>
        <Select
          value={formData.pakistanGraduationYear || ""}
          onValueChange={(value) => updateFormData({ pakistanGraduationYear: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {graduationYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
