import { useState } from "react";
import { Invite } from "../types";

interface UseInvites {
  givenInvites: Invite[];
  receivedInvites: Invite[];
  loadMoreGivenInvites: () => void;
  loadMoreReceivedInvites: () => void;
  addInvite: (selectedAccount: { id: string; name: string }) => void;
  updateInvitePermissions: (inviteId: string, permissions: string[]) => void;
  deleteInvite: (inviteId: string) => void;
  updateInviteStatus: (
    inviteId: string,
    status: "accepted" | "rejected"
  ) => void;
}

export const useInvites = (): UseInvites => {
  const [givenInvites, setGivenInvites] = useState<Invite[]>([
    {
      id: "1",
      user: "User A",
      invitedOn: new Date().toLocaleDateString(),
      permissions: ["read_posts"],
      permissionsSummary: "Read Posts",
      status: "pending",
    },
  ]);

  const [receivedInvites, setReceivedInvites] = useState<Invite[]>([
    {
      id: "2",
      user: "User B",
      invitedOn: new Date().toLocaleDateString(),
      permissions: ["read_messages"],
      permissionsSummary: "Read Messages",
      status: "received",
    },
  ]);

  const loadMoreGivenInvites = () => {
    const moreGivenInvites: Invite[] = [
      {
        id: (givenInvites.length + 1).toString(),
        user: `User ${String.fromCharCode(65 + givenInvites.length)}`,
        invitedOn: new Date().toLocaleDateString(),
        permissions: ["read_posts"],
        permissionsSummary: "Read Posts",
        status: "pending",
      },
    ];
    setGivenInvites((prev) => [...prev, ...moreGivenInvites]);
  };

  const loadMoreReceivedInvites = () => {
    const moreReceivedInvites: Invite[] = [
      {
        id: (receivedInvites.length + 1).toString(),
        user: `User ${String.fromCharCode(65 + receivedInvites.length)}`,
        invitedOn: new Date().toLocaleDateString(),
        permissions: ["read_messages"],
        permissionsSummary: "Read Messages",
        status: "received",
      },
    ];
    setReceivedInvites((prev) => [...prev, ...moreReceivedInvites]);
  };

  const addInvite = (selectedAccount: { id: string; name: string }) => {
    const newInvite: Invite = {
      id: (givenInvites.length + 1).toString(),
      user: selectedAccount.name,
      invitedOn: new Date().toLocaleDateString(),
      permissions: ["read_posts"],
      permissionsSummary: "Read Posts",
      status: "pending",
    };

    // Add to givenInvites
    setGivenInvites((prev) => [...prev, newInvite]);

    // Add to receivedInvites as a received invite for the user
    const receivedInvite: Invite = {
      ...newInvite,
      status: "received",
    };

    setReceivedInvites((prev) => [...prev, receivedInvite]);
  };

  const updateInvitePermissions = (inviteId: string, permissions: string[]) => {
    setGivenInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId
          ? {
              ...invite,
              permissions,
              permissionsSummary: permissions.join(", "),
            }
          : invite
      )
    );
  };

  const updateInviteStatus = (
    inviteId: string,
    status: "accepted" | "rejected"
  ) => {
    // Update status in receivedInvites
    setReceivedInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId
          ? ({ ...invite, status } as Invite) // Cast to Invite
          : invite
      )
    );

    // Update status in givenInvites to reflect the change
    setGivenInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId
          ? ({ ...invite, status } as Invite) // Cast to Invite
          : invite
      )
    );
  };

  const deleteInvite = (inviteId: string) => {
    setGivenInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
    setReceivedInvites((prev) =>
      prev.filter((invite) => invite.id !== inviteId)
    );
  };

  return {
    givenInvites,
    receivedInvites,
    loadMoreGivenInvites,
    loadMoreReceivedInvites,
    addInvite,
    updateInvitePermissions,
    deleteInvite,
    updateInviteStatus, // Expose updateInviteStatus to handle accept/reject actions
  };
};
