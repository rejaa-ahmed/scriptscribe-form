export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      registrations: {
        Row: {
          age: string | null
          areas_of_interest: string[] | null
          availability: string | null
          city: string | null
          comments: string | null
          company_name: string | null
          country: string | null
          created_at: string
          current_constituency: string | null
          current_occupation: string | null
          designation: string | null
          email: string
          employer: string | null
          expert_teams: string[] | null
          expertise: string | null
          first_name: string
          gender: string | null
          id: string
          is_student: string | null
          job_title: string | null
          join_experts: string | null
          last_name: string
          linkedin: string | null
          overseas_country: string | null
          overseas_degree: string | null
          overseas_department: string | null
          overseas_graduation_year: string | null
          overseas_university: string | null
          pakistan_degree: string | null
          pakistan_department: string | null
          pakistan_graduation_year: string | null
          pakistan_university: string | null
          part_of_solution: string | null
          phd_expertise: string | null
          phone: string | null
          referral: string | null
          rural_constituency: string | null
          skills: string | null
          state: string | null
          time_commitment: string | null
          updated_at: string
          urban_constituency: string | null
          user_id: string
        }
        Insert: {
          age?: string | null
          areas_of_interest?: string[] | null
          availability?: string | null
          city?: string | null
          comments?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          current_constituency?: string | null
          current_occupation?: string | null
          designation?: string | null
          email: string
          employer?: string | null
          expert_teams?: string[] | null
          expertise?: string | null
          first_name: string
          gender?: string | null
          id?: string
          is_student?: string | null
          job_title?: string | null
          join_experts?: string | null
          last_name: string
          linkedin?: string | null
          overseas_country?: string | null
          overseas_degree?: string | null
          overseas_department?: string | null
          overseas_graduation_year?: string | null
          overseas_university?: string | null
          pakistan_degree?: string | null
          pakistan_department?: string | null
          pakistan_graduation_year?: string | null
          pakistan_university?: string | null
          part_of_solution?: string | null
          phd_expertise?: string | null
          phone?: string | null
          referral?: string | null
          rural_constituency?: string | null
          skills?: string | null
          state?: string | null
          time_commitment?: string | null
          updated_at?: string
          urban_constituency?: string | null
          user_id: string
        }
        Update: {
          age?: string | null
          areas_of_interest?: string[] | null
          availability?: string | null
          city?: string | null
          comments?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          current_constituency?: string | null
          current_occupation?: string | null
          designation?: string | null
          email?: string
          employer?: string | null
          expert_teams?: string[] | null
          expertise?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          is_student?: string | null
          job_title?: string | null
          join_experts?: string | null
          last_name?: string
          linkedin?: string | null
          overseas_country?: string | null
          overseas_degree?: string | null
          overseas_department?: string | null
          overseas_graduation_year?: string | null
          overseas_university?: string | null
          pakistan_degree?: string | null
          pakistan_department?: string | null
          pakistan_graduation_year?: string | null
          pakistan_university?: string | null
          part_of_solution?: string | null
          phd_expertise?: string | null
          phone?: string | null
          referral?: string | null
          rural_constituency?: string | null
          skills?: string | null
          state?: string | null
          time_commitment?: string | null
          updated_at?: string
          urban_constituency?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
