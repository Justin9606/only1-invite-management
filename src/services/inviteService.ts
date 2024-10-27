import { useState } from "react";
import { Invite } from "../types";

interface UseInvites {
  givenInvites: Invite[];
  receivedInvites: Invite[];
  loadMoreGivenInvites: () => void;
  loadMoreReceivedInvites: () => void;
  addInvite: (
    selectedAccount: { id: string; name: string },
    permissions: string[]
  ) => void;
  updateInvitePermissions: (inviteId: string, permissions: string[]) => void;
  updateInviteStatus: (
    inviteId: string,
    status: "accepted" | "rejected"
  ) => void;
  deleteInvite: (inviteId: string) => void;
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

  const addInvite = (
    selectedAccount: { id: string; name: string },
    permissions: string[]
  ) => {
    const newInvite: Invite = {
      id: (givenInvites.length + 1).toString(),
      user: selectedAccount.name,
      invitedOn: new Date().toLocaleDateString(),
      permissions,
      permissionsSummary: permissions.join(", "),
      status: "pending",
    };

    setGivenInvites((prev) => [...prev, newInvite]);

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
    setGivenInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? ({ ...invite, status } as Invite) : invite
      )
    );
    setReceivedInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? ({ ...invite, status } as Invite) : invite
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
    updateInviteStatus,
    deleteInvite,
  };
};
