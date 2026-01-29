import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface ExistingRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
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
  currentOccupation?: string;
  employer?: string;
  jobTitle?: string;
  areasOfInterest?: string[];
  expertise?: string;
  availability?: string;
  partOfSolution?: string;
  skills?: string;
  timeCommitment?: string;
  referral?: string;
  comments?: string;
}

export const useExistingRegistration = () => {
  const { user } = useAuth();
  const [existingRegistration, setExistingRegistration] = useState<ExistingRegistration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExistingRegistration = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching existing registration:", error);
          setIsLoading(false);
          return;
        }

        if (data) {
          setExistingRegistration({
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phone: data.phone ?? undefined,
            city: data.city ?? undefined,
            country: data.country ?? undefined,
            isStudent: data.is_student ?? undefined,
            pakistanDegree: data.pakistan_degree ?? undefined,
            pakistanUniversity: data.pakistan_university ?? undefined,
            pakistanDepartment: data.pakistan_department ?? undefined,
            pakistanGraduationYear: data.pakistan_graduation_year ?? undefined,
            overseasDegree: data.overseas_degree ?? undefined,
            overseasUniversity: data.overseas_university ?? undefined,
            overseasDepartment: data.overseas_department ?? undefined,
            overseasGraduationYear: data.overseas_graduation_year ?? undefined,
            overseasCountry: data.overseas_country ?? undefined,
            currentOccupation: data.current_occupation ?? undefined,
            employer: data.employer ?? undefined,
            jobTitle: data.job_title ?? undefined,
            areasOfInterest: data.areas_of_interest ?? undefined,
            expertise: data.expertise ?? undefined,
            availability: data.availability ?? undefined,
            partOfSolution: data.part_of_solution ?? undefined,
            skills: data.skills ?? undefined,
            timeCommitment: data.time_commitment ?? undefined,
            referral: data.referral ?? undefined,
            comments: data.comments ?? undefined,
          });
        }
      } catch (error) {
        console.error("Error fetching existing registration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingRegistration();
  }, [user]);

  return { existingRegistration, isLoading };
};
