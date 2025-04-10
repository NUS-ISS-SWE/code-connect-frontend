const COMPANY_DETAILS = new Map([
  [
    "companyDescription",
    {
      key: "companyDescription",
      label: "Company Description",
      placeholder: "Describe your company in a few sentences.",
      required: false,
    },
  ],
  [
    "companyEmail",
    {
      key: "companyEmail",
      label: "Company Email*",
      placeholder: "Enter your company email",
      required: true,
    },
  ],
  [
    "companyLocation",
    {
      key: "companyLocation",
      label: "Company Location",
      placeholder: "Enter your company location",
      required: false,
    },
  ],
  [
    "companyLogo",
    {
      key: "companyLogo",
      label: "Company Logo",
      placeholder: "Please upload your company logo",
      required: false,
    },
  ],
  [
    "companyName",
    {
      key: "companyName",
      label: "Company Name*",
      placeholder: "Enter your company name",
      required: true,
    },
  ],
  [
    "companyPhone",
    {
      key: "companyPhone",
      label: "Company Phone",
      placeholder: "Enter your company phone number",
      required: false,
    },
  ],
  [
    "companySize",
    {
      key: "companySize",
      label: "Company Size",
      placeholder: "Enter your company size (e.g., Small, Medium, Large)",
      required: false,
    },
  ],
]);

export { COMPANY_DETAILS };
