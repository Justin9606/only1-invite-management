import React from "react";
import { useInvites } from "../hooks/useInvites";
import InviteTable from "../components/InviteTable";
import Combobox from "../components/Combobox";

const InviteManagement: React.FC = () => {
  const {
    givenInvites,
    receivedInvites,
    loadMoreGivenInvites,
    loadMoreReceivedInvites,
    addInvite,
    updateInvitePermissions,
    deleteInvite,
    updateInviteStatus,
  } = useInvites();

  const handleInviteSend = (selectedAccount: { id: string; name: string }) => {
    addInvite(selectedAccount);
  };

  const handleAcceptInvite = (inviteId: string) => {
    updateInviteStatus(inviteId, "accepted");
  };

  const handleRejectInvite = (inviteId: string) => {
    updateInviteStatus(inviteId, "rejected");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Manage Invites</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Invite a New User</h2>
        <Combobox
          accounts={[
            { id: "1", name: "User A" },
            { id: "2", name: "User B" },
            { id: "3", name: "User C" },
          ]}
          onInvite={handleInviteSend}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Invites Given</h2>
        <InviteTable
          invites={givenInvites}
          loadMoreInvites={loadMoreGivenInvites}
          deleteInvite={deleteInvite}
          updateInvitePermissions={updateInvitePermissions}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Invites Received</h2>
        <InviteTable
          invites={receivedInvites}
          loadMoreInvites={loadMoreReceivedInvites}
          onAcceptInvite={handleAcceptInvite}
          onRejectInvite={handleRejectInvite}
        />
      </section>
    </div>
  );
};

export default InviteManagement;
