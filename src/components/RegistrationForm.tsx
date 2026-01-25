import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormStep } from "./form/FormStep";
import { PersonalInfoSection } from "./form/PersonalInfoSection";
import { PakistanAcademicsSection } from "./form/PakistanAcademicsSection";
import { OverseasAcademicsSection } from "./form/OverseasAcademicsSection";
import { ContributionSection } from "./form/ContributionSection";
import { CommitmentSection } from "./form/CommitmentSection";
import { ArrowLeft, ArrowRight, Save, Send, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const STEPS = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Your Academics in Pakistan" },
  { id: 3, title: "Overseas Academics/Professional experience" },
  { id: 4, title: "What can I do for Pakistan" },
  { id: 5, title: "I want to be part of solution" },
];

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const updateFormData = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSave = () => {
    localStorage.setItem("registrationFormData", JSON.stringify(formData));
    toast.success("Progress saved successfully!");
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields in Personal Info section");
      setCurrentStep(1);
      return;
    }

    if (!user) {
      toast.error("You must be logged in to submit the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("registrations").insert({
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        is_student: formData.isStudent,
        pakistan_degree: formData.pakistanDegree,
        pakistan_university: formData.pakistanUniversity,
        pakistan_department: formData.pakistanDepartment,
        pakistan_graduation_year: formData.pakistanGraduationYear,
        overseas_degree: formData.overseasDegree,
        overseas_university: formData.overseasUniversity,
        overseas_department: formData.overseasDepartment,
        overseas_graduation_year: formData.overseasGraduationYear,
        overseas_country: formData.overseasCountry,
        current_occupation: formData.currentOccupation,
        employer: formData.employer,
        job_title: formData.jobTitle,
        areas_of_interest: formData.areasOfInterest,
        expertise: formData.expertise,
        availability: formData.availability,
        part_of_solution: formData.partOfSolution,
        skills: formData.skills,
        time_commitment: formData.timeCommitment,
        referral: formData.referral,
        comments: formData.comments,
      });

      if (error) {
        console.error("Submission error:", error);
        toast.error("Failed to submit registration. Please try again.");
        return;
      }

      setIsSubmitted(true);
      localStorage.removeItem("registrationFormData");
      toast.success("Registration submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoSection formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PakistanAcademicsSection formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <OverseasAcademicsSection formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ContributionSection formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <CommitmentSection formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-3xl mx-auto shadow-form overflow-hidden">
        <div className="form-section-gradient p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-form-header-foreground">Thank You!</h2>
        </div>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Your registration has been submitted successfully
          </h3>
          <p className="text-muted-foreground mb-6">
            Thank you for joining United for Better Pakistan. Together, we can make a difference!
          </p>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({});
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Submit Another Response
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-form overflow-hidden">
      <FormStep steps={STEPS} currentStep={currentStep} />
      
      <CardContent className="p-6 sm:p-8">
        {renderSection()}
        
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save
            </Button>
            
            {currentStep < STEPS.length ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
