import React from "react";
import { Controller, useFormContext } from "react-hook-form";

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
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      {permissions.map((permission) => (
        <Controller
          key={permission.id}
          name={`permission-${permission.id}`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <span className="text-sm">{permission.label}</span>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={assignedPermissions.includes(permission.id)}
                  onChange={(e) => {
                    field.onChange(e); // Use field's onChange to update React Hook Form state
                    onPermissionChange(permission.id, e.target.checked); // Update external state if needed
                  }}
                  className="form-checkbox rounded text-blue-600"
                />
              </label>
            </div>
          )}
        />
      ))}
    </div>
  );
};

export default PermissionSwitch;
