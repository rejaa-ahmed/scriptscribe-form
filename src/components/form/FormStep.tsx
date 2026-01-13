import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
}

interface FormStepProps {
  steps: Step[];
  currentStep: number;
}

export const FormStep = ({ steps, currentStep }: FormStepProps) => {
  return (
    <div className="form-section-gradient px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive && "bg-white text-form-header-foreground shadow-md",
                  !isCompleted && !isActive && "bg-white/40 text-form-header-foreground/70"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                    isCompleted && "bg-primary-foreground/20",
                    isActive && "bg-primary text-primary-foreground",
                    !isCompleted && !isActive && "bg-form-header-foreground/20"
                  )}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                </span>
                <span className="hidden sm:inline">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:block w-4 h-0.5 bg-white/40 mx-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
