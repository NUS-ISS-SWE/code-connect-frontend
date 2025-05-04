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
      label: "Approve",
      value: "PENDING_REVIEW",
    },
  ],
]);

Object.freeze(ACCOUNT_STATUS);
export { ACCOUNT_STATUS };
