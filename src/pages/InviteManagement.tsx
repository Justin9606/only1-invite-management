import React, { useState } from "react";
import { useInvites } from "../hooks/useInvites";
import InviteTable from "../components/InviteTable";
import Combobox from "../components/Combobox";
import PermissionSwitch from "../components/PermissionSwitch";

const InviteManagement: React.FC = () => {
  const {
    givenInvites,
    receivedInvites,
    loadMoreGivenInvites,
    loadMoreReceivedInvites,
    addInvite,
    updateInviteStatus,
    deleteInvite,
  } = useInvites();

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleInviteSend = (selectedAccount: { id: string; name: string }) => {
    addInvite(selectedAccount, selectedPermissions);
    setSelectedPermissions([]);
  };

  const handleAcceptInvite = (inviteId: string) => {
    updateInviteStatus(inviteId, "accepted");
  };

  const handleRejectInvite = (inviteId: string) => {
    updateInviteStatus(inviteId, "rejected");
  };

  const handlePermissionChange = (permissionId: string, enabled: boolean) => {
    setSelectedPermissions((prev) => {
      let updatedPermissions = enabled
        ? [...prev, permissionId]
        : prev.filter((perm) => perm !== permissionId);

      if (enabled && permissionId.startsWith("write")) {
        const readPermission = permissionId.replace("write", "read");
        if (!updatedPermissions.includes(readPermission)) {
          updatedPermissions.push(readPermission);
        }
      } else if (!enabled && permissionId.startsWith("write")) {
        const readPermission = permissionId.replace("write", "read");
        const otherWritePermissions = updatedPermissions.filter((perm) =>
          perm.startsWith("write")
        );
        if (!otherWritePermissions.includes(readPermission)) {
          updatedPermissions = updatedPermissions.filter(
            (perm) => perm !== readPermission
          );
        }
      }
      return updatedPermissions;
    });
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
        <PermissionSwitch
          permissions={[
            { id: "read_posts", label: "Read Posts" },
            { id: "write_posts", label: "Write Posts" },
            { id: "read_messages", label: "Read Messages" },
            { id: "write_messages", label: "Write Messages" },
            { id: "read_profile", label: "Read Profile Info" },
            { id: "write_profile", label: "Write Profile Info" },
          ]}
          assignedPermissions={selectedPermissions}
          onPermissionChange={handlePermissionChange}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Invites Given</h2>
        <InviteTable
          invites={givenInvites}
          loadMoreInvites={loadMoreGivenInvites}
          deleteInvite={deleteInvite}
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
