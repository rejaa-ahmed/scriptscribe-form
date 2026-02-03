import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { overseasDegrees, graduationYears, designations } from "@/data/formOptions";
import { ExternalLink } from "lucide-react";

interface OverseasAcademicsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const OverseasAcademicsSection = ({ formData, updateFormData }: OverseasAcademicsSectionProps) => {
  return (
    <div className="space-y-8 animate-slide-in">
      {/* Overseas Academics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">For Overseas Pakistanis</h2>

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

      {/* PhD Club Section */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div>
          <h3 className="text-xl font-semibold text-foreground">PhD Club</h3>
          <a 
            href="https://unitedforbetterpakistan.org/phd-club/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
          >
            What is PhD Club? <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phdExpertise">Area of PhD/Expertise</Label>
          <Input
            id="phdExpertise"
            placeholder="Enter your area of expertise"
            value={formData.phdExpertise || ""}
            onChange={(e) => updateFormData({ phdExpertise: e.target.value })}
            className="bg-background"
          />
        </div>
      </div>

      {/* C-Club Section */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div>
          <h3 className="text-xl font-semibold text-foreground">C-Club</h3>
          <a 
            href="https://unitedforbetterpakistan.org/c-club/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
          >
            What is C-Club? <ExternalLink className="w-3 h-3" />
          </a>
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
    </div>
  );
};
