export type Invite = {
  id: string;
  user: string;
  invitedOn: string;
  permissions: string[];
  permissionsSummary: string;
  status: "pending" | "accepted" | "declined" | "received";
};

export type Permission = {
  id: string;
  label: string;
  type: "read" | "write";
};
