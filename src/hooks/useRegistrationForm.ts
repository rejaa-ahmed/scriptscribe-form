import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useExistingRegistration } from "./useExistingRegistration";
import { toast } from "sonner";

const STORAGE_KEY_PREFIX = "registrationFormData_";

export interface RegistrationFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  state?: string;
  gender?: string;
  age?: string;
  linkedin?: string;
  isStudent?: string;
  pakistanDegree?: string;
  pakistanUniversity?: string;
  pakistanDepartment?: string;
  pakistanGraduationYear?: string;
  overseasDegree?: string;
  overseasUniversity?: string;
  overseasDepartment?: string;
  overseasGraduationYear?: string;
  overseasCountry?: string;
  phdExpertise?: string;
  companyName?: string;
  designation?: string;
  currentOccupation?: string;
  employer?: string;
  jobTitle?: string;
  areasOfInterest?: string[];
  expertise?: string;
  availability?: string;
  joinExperts?: string;
  expertTeams?: string[];
  currentConstituency?: string;
  urbanConstituency?: string;
  ruralConstituency?: string;
  partOfSolution?: string;
  skills?: string;
  timeCommitment?: string;
  referral?: string;
  comments?: string;
}

export const useRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useAuth();
  const { existingRegistration, isLoading: isLoadingExisting } = useExistingRegistration();

  const storageKey = user ? `${STORAGE_KEY_PREFIX}${user.id}` : null;

  // Load saved progress from localStorage on mount (user-specific)
  useEffect(() => {
    if (!storageKey) return;
    
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse saved form data:", e);
      }
    }
  }, [storageKey]);

  // Load existing registration data into form (overrides localStorage if exists)
  useEffect(() => {
    if (existingRegistration) {
      setFormData({
        firstName: existingRegistration.firstName,
        lastName: existingRegistration.lastName,
        email: existingRegistration.email,
        phone: existingRegistration.phone,
        city: existingRegistration.city,
        country: existingRegistration.country,
        state: existingRegistration.state,
        gender: existingRegistration.gender,
        age: existingRegistration.age,
        linkedin: existingRegistration.linkedin,
        isStudent: existingRegistration.isStudent,
        pakistanDegree: existingRegistration.pakistanDegree,
        pakistanUniversity: existingRegistration.pakistanUniversity,
        pakistanDepartment: existingRegistration.pakistanDepartment,
        pakistanGraduationYear: existingRegistration.pakistanGraduationYear,
        overseasDegree: existingRegistration.overseasDegree,
        overseasUniversity: existingRegistration.overseasUniversity,
        overseasDepartment: existingRegistration.overseasDepartment,
        overseasGraduationYear: existingRegistration.overseasGraduationYear,
        overseasCountry: existingRegistration.overseasCountry,
        phdExpertise: existingRegistration.phdExpertise,
        companyName: existingRegistration.companyName,
        designation: existingRegistration.designation,
        currentOccupation: existingRegistration.currentOccupation,
        employer: existingRegistration.employer,
        jobTitle: existingRegistration.jobTitle,
        areasOfInterest: existingRegistration.areasOfInterest,
        expertise: existingRegistration.expertise,
        availability: existingRegistration.availability,
        joinExperts: existingRegistration.joinExperts,
        expertTeams: existingRegistration.expertTeams,
        currentConstituency: existingRegistration.currentConstituency,
        urbanConstituency: existingRegistration.urbanConstituency,
        ruralConstituency: existingRegistration.ruralConstituency,
        partOfSolution: existingRegistration.partOfSolution,
        skills: existingRegistration.skills,
        timeCommitment: existingRegistration.timeCommitment,
        referral: existingRegistration.referral,
        comments: existingRegistration.comments,
      });
      // Clear localStorage since we have a submitted registration
      if (storageKey) {
        localStorage.removeItem(storageKey);
      }
    }
  }, [existingRegistration, storageKey]);

  const updateFormData = useCallback((data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 8));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSave = useCallback(() => {
    if (!storageKey) {
      toast.error("Please sign in to save your progress");
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(formData));
    toast.success("Progress saved successfully!");
  }, [storageKey, formData]);

  const handleSubmit = useCallback(async () => {
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error("Session expired. Please sign in again.");
        return;
      }

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        state: formData.state,
        gender: formData.gender,
        age: formData.age,
        linkedin: formData.linkedin,
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
        phd_expertise: formData.phdExpertise,
        company_name: formData.companyName,
        designation: formData.designation,
        current_occupation: formData.currentOccupation,
        employer: formData.employer,
        job_title: formData.jobTitle,
        areas_of_interest: formData.areasOfInterest,
        expertise: formData.expertise,
        availability: formData.availability,
        join_experts: formData.joinExperts,
        expert_teams: formData.expertTeams,
        current_constituency: formData.currentConstituency,
        urban_constituency: formData.urbanConstituency,
        rural_constituency: formData.ruralConstituency,
        part_of_solution: formData.partOfSolution,
        skills: formData.skills,
        time_commitment: formData.timeCommitment,
        referral: formData.referral,
        comments: formData.comments,
        ...(existingRegistration ? { mode: "update", registration_id: existingRegistration.id } : {}),
      };

      const response = await supabase.functions.invoke("submit-registration", {
        body: payload,
      });

      if (response.error || response.data?.error) {
        const msg = response.data?.error || "Failed to submit registration. Please try again.";
        toast.error(msg);
        return;
      }

      setIsSubmitted(true);
      setIsEditMode(false);
      if (storageKey) {
        localStorage.removeItem(storageKey);
      }
      toast.success(existingRegistration ? "Registration updated successfully!" : "Registration submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, user, existingRegistration, storageKey]);

  return {
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
  };
};
