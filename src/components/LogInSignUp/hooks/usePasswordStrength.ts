import { useState, useEffect } from "react";

type PasswordStrength = {
  score: number;
  label: string;
};

export const usePasswordStrength = (password: string): PasswordStrength => {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Very Weak",
  });

  useEffect(() => {
    const calculateStrength = (password: string): PasswordStrength => {
      let score = 0;

      // Increase the score based on various conditions
      if (password?.length >= 8) {
        score++;
      }

      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        score++;
      }

      if (/\d/.test(password)) {
        score++;
      }

      if (/[!@#$%^&*]/.test(password)) {
        score++;
      }

      // Map the score to a strength label
      const strengthLabels = [
        "Very Weak",
        "Weak",
        "Moderate",
        "Strong",
        "Very Strong",
      ];

      return {
        score,
        label: strengthLabels[score],
      };
    };

    setStrength(calculateStrength(password));
  }, [password]);

  return strength;
};

export default usePasswordStrength;
