import { useState, useContext, useEffect } from "react";
import { defaultProficiency } from "../../../constants/course";
import { CourseOutlineContext } from "../../../context/CourseOutlineContext";

interface HandleProficiencyParams {
  proficiency: string;
  variant: string;
}

const defaultProfiencies = {
  beginner: "ghost",
  intermediate: "ghost",
  expert: "ghost",
};

const useCourseProficiency = () => {
  const { setProficiency } = useContext(CourseOutlineContext);
  const [profiencies, setProfiencies] =
    useState<{ beginner: string; intermediate: string; expert: string }>(
      defaultProfiencies
    );

  useEffect(() => {
    setProfiencies({ ...defaultProfiencies, [defaultProficiency]: "solid" });
    setProficiency(defaultProficiency);
  }, []);

  const handleProficiency = ({
    proficiency,
    variant,
  }: HandleProficiencyParams) => {
    let newVariant: string;
    if (variant === "ghost") {
      newVariant = "solid";
    } else {
      newVariant = "ghost";
    }

    setProficiency(proficiency);
    setProfiencies((prevState) => {
      return {
        ...prevState,
        ...defaultProfiencies,
        [proficiency]: newVariant,
      };
    });
  };

  return {
    profiencies,
    setProfiencies,
    handleProficiency,
  };
};

export default useCourseProficiency;
