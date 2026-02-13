import { cn } from "@/lib/utils";
import { Check, User, GraduationCap, Globe, Lightbulb, Heart, Stethoscope, Wrench, Tv, BookOpen, Users } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: string;
}

interface FormStepProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

const iconMap: Record<string, React.ElementType> = {
  user: User,
  graduationCap: GraduationCap,
  globe: Globe,
  lightbulb: Lightbulb,
  heart: Heart,
  stethoscope: Stethoscope,
  wrench: Wrench,
  tv: Tv,
  bookOpen: BookOpen,
  users: Users,
};

export const FormStep = ({ steps, currentStep, onStepClick }: FormStepProps) => {
  return (
    <div className="form-section-gradient px-4 py-6 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = iconMap[step.icon] || User;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick?.(step.id)}
              className={cn(
                "relative group flex flex-col items-center gap-2 px-3 py-4 rounded-xl text-sm font-semibold transition-all duration-300 border-2 cursor-pointer",
                isActive &&
                  "bg-card text-foreground border-primary shadow-lg scale-105 ring-2 ring-primary/30",
                isCompleted &&
                  "bg-primary/90 text-primary-foreground border-primary/60 hover:bg-primary",
                !isCompleted &&
                  !isActive &&
                  "bg-card/60 text-foreground/70 border-transparent hover:bg-card/90 hover:border-primary/30 hover:shadow-md"
              )}
            >
              {isCompleted && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-primary-foreground/20">
                  <Check className="w-3 h-3" />
                </span>
              )}
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                  isActive && "bg-primary text-primary-foreground shadow-md",
                  isCompleted && "bg-primary-foreground/20 text-primary-foreground",
                  !isCompleted && !isActive && "bg-muted/30 text-foreground/60 group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-center text-xs leading-tight">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
