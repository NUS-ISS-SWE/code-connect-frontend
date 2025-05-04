const ACCOUNT_STATUS = new Map([
  [
    "active",
    {
      label: "Active",
      value: "ACTIVE",
    },
  ],
  [
    "pending",
    {
      label: "Activate",
      value: "PENDING_REVIEW",
    },
  ],
]);

Object.freeze(ACCOUNT_STATUS);
export { ACCOUNT_STATUS };
