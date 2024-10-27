export interface Invite {
  id: string;
  user: string; // User's name or email who is invited
  invitedOn: string; // Date when the invite was created
  permissions: string[]; // List of permissions granted
  permissionsSummary: string; // Summary of granted permissions (e.g., "Read, Write Posts")
  status: "pending" | "accepted" | "declined" | "received"; // Invite status
}

export interface Permission {
  id: string;
  label: string;
  type: "read" | "write";
}
