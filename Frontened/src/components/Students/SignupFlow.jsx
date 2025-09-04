import React, { useState } from "react";
import {
  Mail,
  User,
  FileText,
  Check,
  UtensilsCrossed,
  Coffee,
  ChefHat,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import EmailVerification from "./EmailVerification";
import PersonalDetails from "./PersonalDetails";
import DocumentUpload from "./DocumentUpload";

const SignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    email: "",
    verificationCode: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    studentId: "",
    registrationNumber: "",
    hostelBlock: "",
    roomNumber: "",
    mealPlan: "",
    dietaryRestrictions: "",
    documents: [],
  });

  const steps = [
    {
      id: 1,
      title: "Email Verification",
      icon: Mail,
      description: "Verify your student email",
    },
    {
      id: 2,
      title: "Personal Details",
      icon: User,
      description: "Complete your profile",
    },
    {
      id: 3,
      title: "Document Upload",
      icon: FileText,
      description: "Upload required documents",
    },
  ];

  const updateSignupData = (data) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmailVerification
            data={signupData}
            updateData={updateSignupData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PersonalDetails
            data={signupData}
            updateData={updateSignupData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <DocumentUpload
            data={signupData}
            updateData={updateSignupData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <UtensilsCrossed className="absolute top-20 left-10 w-20 h-20 text-orange-500 rotate-[15deg]" />
        <Coffee className="absolute top-32 right-16 w-16 h-16 text-amber-500 -rotate-[20deg]" />
        <ChefHat className="absolute bottom-32 left-24 w-20 h-20 text-yellow-500 rotate-45" />
        <UtensilsCrossed className="absolute bottom-16 right-10 w-20 h-20 text-orange-500 -rotate-[15deg]" />
      </div>

      <div className="relative z-10 px-6 py-12 sm:px-8 md:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Student Registration
          </h1>
        </div>

        <div className="flex flex-col items-center md:flex-row justify-center mb-16 space-y-10 md:space-y-0 md:space-x-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white shadow-md scale-105"
                        : isActive
                        ? "bg-orange-500 text-white shadow ring-4 ring-orange-200 scale-105"
                        : "bg-white text-gray-400 shadow border border-gray-200"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center mt-3">
                    <p
                      className={`text-base font-semibold ${
                        isActive || isCompleted
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-sm ${
                        isActive || isCompleted
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-1 bg-gray-300 mx-4 rounded-full relative overflow-hidden">
                    <div
                      className={`absolute h-full rounded-full transition-all duration-500 ease-in-out ${
                        currentStep > step.id ? "bg-green-400 w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white/90 backdrop-blur-md border border-orange-100 rounded-3xl p-6 md:p-12 shadow-2xl min-h-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;
