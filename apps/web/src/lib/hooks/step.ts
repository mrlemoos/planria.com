"use client";

import { useState } from "react";

/**
 * Custom hook for managing a step-based controller.
 *
 * @template TStep The type of the steps.
 * @param steps An array of steps.
 * @param defaultStep The default step to start with.
 * @returns An object containing the current step, next step function, and previous step function.
 */
export function useStepController<TStep extends string>(
  steps: TStep[],
  defaultStep: TStep = steps[0]
) {
  const [currentStep, setCurrentStep] = useState<TStep>(defaultStep);

  /**
   * Moves to the next step in the sequence.
   *
   * If the current step is the last step, this function is interrupted.
   */
  function nextStep() {
    const currentIndex = steps.indexOf(currentStep);
    const nextIndex = currentIndex + 1;
    const nextStep = steps[nextIndex];

    if (nextStep === undefined) {
      return;
    }

    setCurrentStep(nextStep);
  }

  /**
   * Moves to the previous step in the list of steps.
   *
   * If the current step is the first step, this function is interrupted.
   */
  function previousStep() {
    const currentIndex = steps.indexOf(currentStep);
    const previousIndex = currentIndex - 1;
    const previousStep = steps[previousIndex];

    if (previousStep === undefined) {
      return;
    }

    setCurrentStep(previousStep);
  }

  const isFirstStep = currentStep === steps[0];
  const isLastStep = currentStep === steps[steps.length - 1];
  const currentStepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length;

  return {
    currentStep,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    totalSteps,
  };
}
