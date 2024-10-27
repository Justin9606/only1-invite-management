import React from "react";

interface Permission {
  id: string;
  label: string;
}

interface PermissionSwitchProps {
  permissions: Permission[];
  assignedPermissions: string[];
  onPermissionChange: (permissionId: string, enabled: boolean) => void;
}

const PermissionSwitch: React.FC<PermissionSwitchProps> = ({
  permissions,
  assignedPermissions,
  onPermissionChange,
}) => {
  return (
    <div className="space-y-4">
      {permissions.map((permission) => (
        <div key={permission.id} className="flex items-center justify-between">
          <span className="text-sm">{permission.label}</span>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={assignedPermissions.includes(permission.id)}
              onChange={(e) => {
                onPermissionChange(permission.id, e.target.checked);
              }}
              className="form-checkbox rounded text-blue-600"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default PermissionSwitch;
