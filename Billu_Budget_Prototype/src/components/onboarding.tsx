import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface OnboardingData {
  name: string;
  gender: string;
  profession: string;
  reason: string;
  payFrequency: string;
  currency: string;
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

export function Onboarding({ onComplete, onBack }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    gender: '',
    profession: '',
    reason: '',
    payFrequency: '',
    currency: 'INR'
  });

  const steps = [
    {
      title: "Let's get to know you",
      subtitle: "This helps us personalize your experience",
      fields: ['name', 'gender']
    },
    {
      title: "Tell us about your work",
      subtitle: "We'll suggest relevant features based on your profession",
      fields: ['profession', 'payFrequency']
    },
    {
      title: "What's your main goal?",
      subtitle: "This helps us prioritize the right tools for you",
      fields: ['reason', 'currency']
    }
  ];

  const fieldConfig = {
    name: {
      label: "What's your name?",
      type: "input",
      placeholder: "Enter your name"
    },
    gender: {
      label: "Gender (optional)",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "non-binary", label: "Non-binary" },
        { value: "prefer-not-to-say", label: "Prefer not to say" }
      ]
    },
    profession: {
      label: "What do you do?",
      type: "select",
      options: [
        { value: "student", label: "Student" },
        { value: "salaried", label: "Salaried" },
        { value: "freelancer", label: "Freelancer" },
        { value: "self-employed", label: "Self-employed" },
        { value: "homemaker", label: "Homemaker" },
        { value: "retired", label: "Retired" },
        { value: "other", label: "Other" }
      ]
    },
    payFrequency: {
      label: "How often do you get paid?",
      type: "select",
      options: [
        { value: "monthly", label: "Monthly" },
        { value: "bi-monthly", label: "Bi-monthly" },
        { value: "weekly", label: "Weekly" },
        { value: "irregular", label: "Irregular" }
      ]
    },
    reason: {
      label: "What's your main goal?",
      type: "select",
      options: [
        { value: "track-expenses", label: "Track expenses" },
        { value: "save-for-goal", label: "Save for a goal" },
        { value: "reduce-debt", label: "Reduce debt" },
        { value: "manage-family-budget", label: "Manage family budget" },
        { value: "build-emergency-fund", label: "Build emergency fund" }
      ]
    },
    currency: {
      label: "What's your currency?",
      type: "select",
      options: [
        { value: "INR", label: "₹ Indian Rupee" },
        { value: "USD", label: "$ US Dollar" },
        { value: "EUR", label: "€ Euro" },
        { value: "GBP", label: "£ British Pound" },
        { value: "JPY", label: "¥ Japanese Yen" }
      ]
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentFields = steps[currentStep].fields;

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    return currentFields.every(field => {
      if (field === 'gender') return true; // Optional field
      return formData[field as keyof OnboardingData].trim() !== '';
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderField = (fieldKey: string) => {
    const field = fieldConfig[fieldKey as keyof typeof fieldConfig];
    const value = formData[fieldKey as keyof OnboardingData];

    if (field.type === 'input') {
      return (
        <div key={fieldKey} className="space-y-2">
          <Label>{field.label}</Label>
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(fieldKey as keyof OnboardingData, e.target.value)}
            className="h-12"
          />
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={fieldKey} className="space-y-2">
          <Label>{field.label}</Label>
          <Select value={value} onValueChange={(val) => handleInputChange(fieldKey as keyof OnboardingData, val)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-primary/10">
        <div className="p-6 space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {currentFields.map(renderField)}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}