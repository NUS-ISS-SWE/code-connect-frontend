const EMPLOYER_DETAILS = new Map([
  [
    "companyDescription",
    {
      key: "companyDescription",
      label: "Company Description",
      placeholder: "Describe your company in a few sentences.",
      required: false,
      type: "textarea",
    },
  ],
  // [
  //   "companyEmail",
  //   {
  //     key: "companyEmail",
  //     label: "Company Email*",
  //     placeholder: "Enter your company email",
  //     required: false,
  //     type: "email",
  //   },
  // ],
  [
    "companyIndustry",
    {
      key: "companyIndustry",
      label: "Company Industry",
      placeholder: "Enter your company industry",
      required: true,
      type: "text",
    },
  ],
  [
    "companyLocation",
    {
      key: "companyLocation",
      label: "Company Location",
      placeholder: "Enter your company location",
      required: false,
      type: "text",
    },
  ],
  // [
  //   "companyLogo",
  //   {
  //     key: "companyLogo",
  //     label: "Company Logo",
  //     placeholder: "Please upload your company logo",
  //     required: false,
  //     type: "file",
  //   },
  // ],
  [
    "companyName",
    {
      key: "companyName",
      label: "Company Name*",
      placeholder: "Enter your company name",
      required: true,
      type: "text",
    },
  ],
  // [
  //   "companyPhone",
  //   {
  //     key: "companyPhone",
  //     label: "Company Phone",
  //     placeholder: "Enter your company phone number",
  //     required: false,
  //     type: "text",
  //   },
  // ],
  [
    "companySize",
    {
      key: "companySize",
      label: "Company Size",
      placeholder: "Enter your company size (e.g., Small, Medium, Large)",
      required: false,
      type: "number",
    },
  ],
]);

export { EMPLOYER_DETAILS };
