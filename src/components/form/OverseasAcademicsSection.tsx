import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { overseasDegrees, graduationYears } from "@/data/formOptions";

interface OverseasAcademicsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const OverseasAcademicsSection = ({ formData, updateFormData }: OverseasAcademicsSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Overseas Academics</h2>
        <p className="text-sm text-muted-foreground mt-2">
          For Overseas Pakistanis — share your international academic background.
        </p>
      </div>

      {/* Highest Degree Abroad */}
      <div className="space-y-2">
        <Label>Highest Degree Abroad</Label>
        <Select
          value={formData.overseasDegree || ""}
          onValueChange={(value) => updateFormData({ overseasDegree: value })}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {overseasDegrees.map((degree) => (
              <SelectItem key={degree} value={degree}>
                {degree}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* University */}
      <div className="space-y-2">
        <Label htmlFor="overseasUniversity">University/College</Label>
        <Input
          id="overseasUniversity"
          placeholder="Enter your university or college name"
          value={formData.overseasUniversity || ""}
          onChange={(e) => updateFormData({ overseasUniversity: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Department */}
      <div className="space-y-2">
        <Label htmlFor="overseasDepartment">Department</Label>
        <Input
          id="overseasDepartment"
          placeholder="Enter your department"
          value={formData.overseasDepartment || ""}
          onChange={(e) => updateFormData({ overseasDepartment: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="overseasCountry">Country of Study</Label>
        <Input
          id="overseasCountry"
          placeholder="Enter the country"
          value={formData.overseasCountry || ""}
          onChange={(e) => updateFormData({ overseasCountry: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Graduation Year */}
      <div className="space-y-2">
        <Label>Year Graduated or Expected to Graduate</Label>
        <Select
          value={formData.overseasGraduationYear || ""}
          onValueChange={(value) => updateFormData({ overseasGraduationYear: value })}
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
