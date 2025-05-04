import { useEffect, useRef } from "react";

import { createJob } from "../../../api/JobPostingsApi";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import jobListings from "../jobListings";
import { extractSalaryRange } from "../../../utils/stringUtils";

const DUMMY_VAUES = {
  companyDescription:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  jobDescription:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  preferredSkills:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  requiredCertifications:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  requiredSkills:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
};

const useGenerateJobs = () => {
  const { state, dispatch } = useGlobalContext();
  const hasRun = useRef(false);

  // useEffect(() => {
  //   if (hasRun.current) return;
  //   hasRun.current = true;

  //   let promises = [];
  //   for (const job of jobListings) {
  //     const { companyName, location, jobTitle, jobType, ...rest } = job;

  //     const [minSalary, maxSalary] = extractSalaryRange(job.salaryRange);

  //     const formData = {
  //       companyName,
  //       jobLocation: location,
  //       jobTitle,
  //       jobType,
  //       salaryRangeMin: minSalary,
  //       salaryRangeMax: maxSalary,
  //       ...DUMMY_VAUES,
  //     };

  //     promises.push(postJob(formData, dispatch));
  //   }

  //   postAllJobs(promises);
  // }, []);

  const generateJobs = () => {
    let promises = [];
    for (const job of jobListings) {
      const { companyName, location, jobTitle, jobType, ...rest } = job;

      const [minSalary, maxSalary] = extractSalaryRange(job.salaryRange);

      const formData = {
        companyName,
        jobLocation: location,
        jobTitle,
        jobType,
        salaryRangeMin: minSalary,
        salaryRangeMax: maxSalary,
        ...DUMMY_VAUES,
      };

      promises.push(postJob(formData, dispatch));
    }

    postAllJobs(promises);
  };

  const postAllJobs = async (promises) => {
    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Job ${index} created successfully`, result.value);
      } else {
        console.error(`Job ${index} failed to create`, result.reason);
      }
    });
  };

  const postJob = async (formData, dispatch) => {
    const { data, status, ...rest } = await createJob(formData, dispatch);

    if (status === 200) {
      return { data, status, ...rest };
    }
  };

  return { generateJobs };
};

export default useGenerateJobs;
