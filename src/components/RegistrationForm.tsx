import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormStep } from "./form/FormStep";
import { PersonalInfoSection } from "./form/PersonalInfoSection";
import { PakistanAcademicsSection } from "./form/PakistanAcademicsSection";
import { OverseasAcademicsSection } from "./form/OverseasAcademicsSection";
import { PhDClubSection } from "./form/PhDClubSection";
import { CClubSection } from "./form/CClubSection";
import { ExpertTeamsSection } from "./form/ExpertTeamsSection";
import { ConstituencySection } from "./form/ConstituencySection";
import { CommitmentSection } from "./form/CommitmentSection";
import { ArrowLeft, ArrowRight, Save, Send, CheckCircle, Loader2, Edit } from "lucide-react";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";

const TOTAL_STEPS = 8;

const STEPS = [
  { id: 1, title: "Personal Info", icon: "user" },
  { id: 2, title: "Student / Alumni Corner", icon: "graduationCap" },
  { id: 3, title: "Overseas Academics", icon: "globe" },
  { id: 4, title: "PhD Club", icon: "bookOpen" },
  { id: 5, title: "C-Club", icon: "briefcase" },
  { id: 6, title: "Expert Teams", icon: "lightbulb" },
  { id: 7, title: "Constituency Corner", icon: "mapPin" },
  { id: 8, title: "Commitment", icon: "heart" },
];

export const RegistrationForm = () => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    updateFormData,
    isSubmitted,
    isSubmitting,
    isEditMode,
    setIsEditMode,
    isLoadingExisting,
    existingRegistration,
    handleNext,
    handleBack,
    handleSave,
    handleSubmit,
  } = useRegistrationForm();

  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoSection formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PakistanAcademicsSection formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <OverseasAcademicsSection formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <PhDClubSection formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <CClubSection formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <ExpertTeamsSection formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <ConstituencySection formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <CommitmentSection formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  // Show loading state while checking for existing registration
  if (isLoadingExisting) {
    return (
      <Card className="max-w-3xl mx-auto shadow-form overflow-hidden">
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  // Show existing registration view (if they have one and aren't editing)
  if (existingRegistration && !isEditMode && !isSubmitted) {
    return (
      <Card className="max-w-3xl mx-auto shadow-form overflow-hidden">
        <div className="form-section-gradient p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-form-header-foreground">Registration Complete</h2>
        </div>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            You have already submitted your registration
          </h3>
          <p className="text-muted-foreground mb-6">
            Thank you for joining United for Better Pakistan! You can edit your submission below.
          </p>
          <Button 
            onClick={() => setIsEditMode(true)}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 mx-auto"
          >
            <Edit className="w-4 h-4" /> Edit My Registration
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-3xl mx-auto shadow-form overflow-hidden">
        <div className="form-section-gradient p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-form-header-foreground">Thank You!</h2>
        </div>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {existingRegistration ? "Your registration has been updated successfully" : "Your registration has been submitted successfully"}
          </h3>
          <p className="text-muted-foreground mb-6">
            Thank you for joining United for Better Pakistan. Together, we can make a difference!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-form overflow-hidden">
      <FormStep steps={STEPS} currentStep={currentStep} onStepClick={(id) => { setCurrentStep(id); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      
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
            
            {currentStep < TOTAL_STEPS ? (
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
                    <Loader2 className="w-4 h-4 animate-spin" /> {existingRegistration ? "Updating..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> {existingRegistration ? "Update" : "Submit"}
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
