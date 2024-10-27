import React, { useState } from "react";
import { Invite } from "../types";
import Modal from "./Modal";

interface InviteTableProps {
  invites: Invite[];
  loadMoreInvites: () => void;
  deleteInvite?: (inviteId: string) => void;
  onAcceptInvite?: (inviteId: string) => void;
  onRejectInvite?: (inviteId: string) => void;
}

const InviteTable: React.FC<InviteTableProps> = ({
  invites,
  loadMoreInvites,
  deleteInvite,
  onAcceptInvite,
  onRejectInvite,
}) => {
  const [expandedInvite, setExpandedInvite] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const toggleExpanded = (inviteId: string) => {
    setExpandedInvite((prev) => (prev === inviteId ? null : inviteId));
  };

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
          {invites.map((invite) => (
            <React.Fragment key={invite.id}>
              {/* Collapsed Row */}
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
                  {deleteInvite && (
                    <button
                      className="ml-4 text-red-600 hover:underline"
                      onClick={() => setConfirmDelete(invite.id)}
                    >
                      Delete
                    </button>
                  )}
                  {onAcceptInvite && onRejectInvite && (
                    <>
                      <button
                        className="ml-4 text-green-600 hover:underline"
                        onClick={() => onAcceptInvite(invite.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="ml-4 text-red-600 hover:underline"
                        onClick={() => onRejectInvite(invite.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>

              {/* Expanded Row for Read-Only Permissions */}
              {expandedInvite === invite.id && (
                <tr>
                  <td colSpan={5} className="px-4 py-2">
                    <div>
                      <h4 className="font-semibold">Permissions:</h4>
                      <ul className="list-disc pl-6 text-gray-700">
                        {invite.permissions.map((perm) => (
                          <li key={perm}>{perm}</li>
                        ))}
                      </ul>
                    </div>
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

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <Modal
          title="Confirm Delete"
          onConfirm={() => {
            deleteInvite?.(confirmDelete);
            setConfirmDelete(null);
          }}
          onCancel={() => setConfirmDelete(null)}
        >
          Are you sure you want to delete this invite?
        </Modal>
      )}
    </div>
  );
};

export default InviteTable;
