import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Invite } from "../types";
import Modal from "./Modal";
import PermissionSwitch from "./PermissionSwitch";

interface InviteTableProps {
  invites: Invite[];
  loadMoreInvites: () => void;
  deleteInvite?: (inviteId: string) => void; // Made optional
  updateInvitePermissions?: (inviteId: string, permissions: string[]) => void; // Made optional
  onAcceptInvite?: (inviteId: string) => void;
  onRejectInvite?: (inviteId: string) => void;
}

const InviteTable: React.FC<InviteTableProps> = ({
  invites,
  loadMoreInvites,
  deleteInvite,
  updateInvitePermissions,
  onAcceptInvite,
  onRejectInvite,
}) => {
  const [expandedInvite, setExpandedInvite] = useState<string | null>(null);
  const [confirmReject, setConfirmReject] = useState<string | null>(null);

  const toggleExpanded = (inviteId: string) => {
    setExpandedInvite((prev) => (prev === inviteId ? null : inviteId));
  };

  const formMethods = useForm(); // Initialize form methods

  return (
    <div className="overflow-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Account</th>
            <th className="px-4 py-2 text-left">Invited On</th>
            <th className="px-4 py-2 text-left">Permissions</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invites.map((invite: Invite) => (
            <React.Fragment key={invite.id}>
              <tr className="border-t">
                <td className="px-4 py-2">{invite.user}</td>
                <td className="px-4 py-2">{invite.invitedOn}</td>
                <td className="px-4 py-2">{invite.permissionsSummary}</td>
                <td className="px-4 py-2">{invite.status}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => toggleExpanded(invite.id)}
                  >
                    {expandedInvite === invite.id ? "Collapse" : "Expand"}
                  </button>
                  {onAcceptInvite && onRejectInvite ? (
                    <>
                      <button
                        className="ml-4 text-green-600 hover:underline"
                        onClick={() => onAcceptInvite(invite.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="ml-4 text-red-600 hover:underline"
                        onClick={() => setConfirmReject(invite.id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    deleteInvite && (
                      <button
                        className="ml-4 text-red-600 hover:underline"
                        onClick={() => deleteInvite(invite.id)}
                      >
                        Delete
                      </button>
                    )
                  )}
                </td>
              </tr>
              {expandedInvite === invite.id && (
                <tr>
                  <td colSpan={5} className="px-4 py-2">
                    {updateInvitePermissions ? (
                      <FormProvider {...formMethods}>
                        <PermissionsSection
                          invite={invite}
                          onChange={updateInvitePermissions}
                        />
                      </FormProvider>
                    ) : (
                      <div className="italic text-gray-600">
                        Permissions cannot be modified for received invites.
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button
        className="w-full p-4 bg-gray-200 hover:bg-gray-300"
        onClick={loadMoreInvites}
      >
        Load More
      </button>

      {confirmReject && (
        <Modal
          title="Confirm Rejection"
          onConfirm={() => {
            onRejectInvite && onRejectInvite(confirmReject);
            setConfirmReject(null);
          }}
          onCancel={() => setConfirmReject(null)}
        >
          Are you sure you want to reject this invite?
        </Modal>
      )}
    </div>
  );
};

const PermissionsSection: React.FC<{
  invite: Invite;
  onChange: (inviteId: string, permissions: string[]) => void;
}> = ({ invite, onChange }) => {
  const permissions = [
    { id: "read_posts", label: "Read Posts" },
    { id: "write_posts", label: "Write Posts" },
    { id: "read_messages", label: "Read Messages" },
    { id: "write_messages", label: "Write Messages" },
    { id: "read_profile", label: "Read Profile Info" },
    { id: "write_profile", label: "Write Profile Info" },
  ];

  const handlePermissionChange = (permissionId: string, enabled: boolean) => {
    let updatedPermissions = [...invite.permissions];

    if (enabled) {
      updatedPermissions.push(permissionId);
      if (permissionId.startsWith("write")) {
        const readPermission = permissionId.replace("write", "read");
        if (!updatedPermissions.includes(readPermission)) {
          updatedPermissions.push(readPermission);
        }
      }
    } else {
      updatedPermissions = updatedPermissions.filter(
        (perm) => perm !== permissionId
      );
      if (permissionId.startsWith("write")) {
        const readPermission = permissionId.replace("write", "read");
        if (updatedPermissions.includes(readPermission)) {
          updatedPermissions = updatedPermissions.filter(
            (perm) => perm !== readPermission
          );
        }
      }
    }
    onChange(invite.id, updatedPermissions);
  };

  return (
    <PermissionSwitch
      permissions={permissions}
      assignedPermissions={invite.permissions}
      onPermissionChange={handlePermissionChange}
    />
  );
};

export default InviteTable;
