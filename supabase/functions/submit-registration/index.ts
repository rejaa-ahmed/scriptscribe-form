import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_TEXT = 500;
const MAX_SHORT = 100;
const MAX_EMAIL = 255;

function sanitizeText(val: unknown, maxLen: number): string | null {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val !== "string") return null;
  return val.trim().slice(0, maxLen);
}

function validateEmail(val: unknown): string | null {
  const s = sanitizeText(val, MAX_EMAIL);
  if (!s) return null;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(s) ? s : null;
}

function validatePhone(val: unknown): string | null {
  const s = sanitizeText(val, 30);
  if (!s) return null;
  const re = /^\+?[\d\s\-().]{7,25}$/;
  return re.test(s) ? s : null;
}

function validateUrl(val: unknown): string | null {
  const s = sanitizeText(val, 500);
  if (!s) return null;
  try {
    const url = new URL(s);
    if (url.protocol === "http:" || url.protocol === "https:") return s;
    return null;
  } catch {
    return null;
  }
}

function validateYear(val: unknown): string | null {
  const s = sanitizeText(val, 4);
  if (!s) return null;
  const n = parseInt(s, 10);
  if (isNaN(n) || n < 1950 || n > 2040) return null;
  return s;
}

function validateStringArray(val: unknown, maxItems = 20, maxLen = MAX_SHORT): string[] | null {
  if (!Array.isArray(val)) return null;
  const result = val
    .slice(0, maxItems)
    .map((v) => sanitizeText(v, maxLen))
    .filter((v): v is string => v !== null);
  return result.length > 0 ? result : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { mode, registration_id } = body;

    // Validate required fields
    const firstName = sanitizeText(body.first_name, MAX_SHORT);
    const lastName = sanitizeText(body.last_name, MAX_SHORT);
    const email = validateEmail(body.email);

    if (!firstName || !lastName || !email) {
      return new Response(
        JSON.stringify({ error: "First name, last name, and a valid email are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const registrationData = {
      user_id: user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone: validatePhone(body.phone),
      city: sanitizeText(body.city, MAX_SHORT),
      country: sanitizeText(body.country, MAX_SHORT),
      state: sanitizeText(body.state, MAX_SHORT),
      gender: sanitizeText(body.gender, 20),
      age: sanitizeText(body.age, 20),
      linkedin: validateUrl(body.linkedin),
      is_student: sanitizeText(body.is_student, 20),
      pakistan_degree: sanitizeText(body.pakistan_degree, MAX_TEXT),
      pakistan_university: sanitizeText(body.pakistan_university, MAX_TEXT),
      pakistan_department: sanitizeText(body.pakistan_department, MAX_TEXT),
      pakistan_graduation_year: validateYear(body.pakistan_graduation_year),
      overseas_degree: sanitizeText(body.overseas_degree, MAX_TEXT),
      overseas_university: sanitizeText(body.overseas_university, MAX_TEXT),
      overseas_department: sanitizeText(body.overseas_department, MAX_TEXT),
      overseas_graduation_year: validateYear(body.overseas_graduation_year),
      overseas_country: sanitizeText(body.overseas_country, MAX_SHORT),
      phd_expertise: sanitizeText(body.phd_expertise, MAX_TEXT),
      company_name: sanitizeText(body.company_name, MAX_TEXT),
      designation: sanitizeText(body.designation, MAX_TEXT),
      current_occupation: sanitizeText(body.current_occupation, MAX_TEXT),
      employer: sanitizeText(body.employer, MAX_TEXT),
      job_title: sanitizeText(body.job_title, MAX_TEXT),
      areas_of_interest: validateStringArray(body.areas_of_interest),
      expertise: sanitizeText(body.expertise, MAX_TEXT),
      availability: sanitizeText(body.availability, MAX_TEXT),
      join_experts: sanitizeText(body.join_experts, 20),
      expert_teams: validateStringArray(body.expert_teams),
      current_constituency: sanitizeText(body.current_constituency, MAX_TEXT),
      urban_constituency: sanitizeText(body.urban_constituency, MAX_TEXT),
      rural_constituency: sanitizeText(body.rural_constituency, MAX_TEXT),
      part_of_solution: sanitizeText(body.part_of_solution, MAX_TEXT),
      skills: sanitizeText(body.skills, MAX_TEXT),
      time_commitment: sanitizeText(body.time_commitment, MAX_TEXT),
      referral: sanitizeText(body.referral, MAX_TEXT),
      comments: sanitizeText(body.comments, 1000),
    };

    let error;

    if (mode === "update" && registration_id) {
      const result = await supabase
        .from("registrations")
        .update(registrationData)
        .eq("id", registration_id);
      error = result.error;
    } else {
      const result = await supabase.from("registrations").insert(registrationData);
      error = result.error;
    }

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to save registration." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "An unexpected error occurred." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
