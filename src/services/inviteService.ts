import { Invite } from "../types";

const INVITES_KEY = "invites";

const getInvites = (): Invite[] => {
  const invites = localStorage.getItem(INVITES_KEY);
  return invites ? JSON.parse(invites) : [];
};

const saveInvites = (invites: Invite[]) => {
  localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
};

export const inviteService = {
  getInvites: (): Invite[] => {
    return getInvites();
  },

  addInvite: (newInvite: Invite) => {
    const invites = getInvites();
    invites.push(newInvite);
    saveInvites(invites);
  },

  updateInvitePermissions: (inviteId: string, permissions: string[]) => {
    const invites = getInvites();
    const updatedInvites = invites.map((invite) =>
      invite.id === inviteId ? { ...invite, permissions } : invite
    );
    saveInvites(updatedInvites);
  },

  deleteInvite: (inviteId: string) => {
    const invites = getInvites().filter((invite) => invite.id !== inviteId);
    saveInvites(invites);
  },
};
