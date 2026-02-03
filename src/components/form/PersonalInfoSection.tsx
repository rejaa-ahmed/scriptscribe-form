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
import { countries, ageRanges } from "@/data/formOptions";

interface PersonalInfoSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const PersonalInfoSection = ({ formData, updateFormData }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-foreground">Personal Info</h2>
      
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName || ""}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName || ""}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="bg-background"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          value={formData.email || ""}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label>All States and Cities</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            value={formData.country || ""}
            onValueChange={(value) => updateFormData({ country: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            placeholder="State/Province"
            value={formData.state || ""}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="bg-background"
          />
          
          <Input
            placeholder="City"
            value={formData.city || ""}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="bg-background"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+92 300 1234567"
          value={formData.phone || ""}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Gender */}
      <div className="space-y-3">
        <Label>Gender *</Label>
        <RadioGroup
          value={formData.gender || ""}
          onValueChange={(value) => updateFormData({ gender: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Age */}
      <div className="space-y-2">
        <Label>Age *</Label>
        <RadioGroup
          value={formData.age || ""}
          onValueChange={(value) => updateFormData({ age: value })}
          className="flex flex-wrap gap-3"
        >
          {ageRanges.map((range) => (
            <div key={range} className="flex items-center space-x-2">
              <RadioGroupItem value={range} id={`age-${range}`} />
              <Label htmlFor={`age-${range}`} className="font-normal cursor-pointer">{range}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile Link</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData.linkedin || ""}
          onChange={(e) => updateFormData({ linkedin: e.target.value })}
          className="bg-background"
        />
      </div>
    </div>
  );
};
