import { useState } from "react";
import { Invite } from "../types";

interface UseInvites {
  invites: Invite[];
  loadMoreInvites: () => void;
  addInvite: (selectedAccount: { id: string; name: string }) => void;
  updateInvitePermissions: (inviteId: string, permissions: string[]) => void;
  deleteInvite: (inviteId: string) => void;
}

export const useInvites = (): UseInvites => {
  const [invites, setInvites] = useState<Invite[]>([
    {
      id: "1",
      user: "User A",
      invitedOn: new Date().toLocaleDateString(),
      permissions: ["read_posts"],
      permissionsSummary: "Read Posts",
      status: "pending",
    },
  ]);

  const loadMoreInvites = () => {
    const moreInvites: Invite[] = [
      {
        id: (invites.length + 1).toString(),
        user: `User ${String.fromCharCode(65 + invites.length)}`,
        invitedOn: new Date().toLocaleDateString(),
        permissions: ["read_posts"],
        permissionsSummary: "Read Posts",
        status: "pending",
      },
    ];
    setInvites((prev) => [...prev, ...moreInvites]);
  };

  const addInvite = (selectedAccount: { id: string; name: string }) => {
    const newInvite: Invite = {
      id: (invites.length + 1).toString(),
      user: selectedAccount.name,
      invitedOn: new Date().toLocaleDateString(),
      permissions: ["read_posts"],
      permissionsSummary: "Read Posts",
      status: "pending",
    };
    setInvites((prev) => [...prev, newInvite]);
  };

  const updateInvitePermissions = (inviteId: string, permissions: string[]) => {
    setInvites((prev) =>
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

  const deleteInvite = (inviteId: string) => {
    setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  return {
    invites,
    loadMoreInvites,
    addInvite,
    updateInvitePermissions,
    deleteInvite,
  };
};
