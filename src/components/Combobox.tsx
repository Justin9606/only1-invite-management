import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label, Input, ListBox } from "react-aria-components";

interface Account {
  id: string;
  name: string;
}

interface ComboboxProps {
  accounts: Account[];
  onInvite: (account: Account) => void;
}

interface FormValues {
  account: Account | null;
}

const Combobox: React.FC<ComboboxProps> = ({ accounts, onInvite }) => {
  const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: { account: null },
  });
  const [inputValue, setInputValue] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setFilteredAccounts(
      accounts.filter((account) =>
        account.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onSubmit = handleSubmit(({ account }) => {
    if (account) {
      onInvite(account);
      reset();
      setInputValue("");
    } else {
      alert("Please select an account to invite.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <Controller
        name="account"
        control={control}
        render={({ field }) => (
          <>
            <Label className="font-semibold">Account:</Label>
            <Input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search account..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            {inputValue && (
              <ListBox
                className="w-full border border-gray-200 rounded shadow-md"
                items={filteredAccounts}
                onSelectionChange={(key) => {
                  const selected = accounts.find(
                    (account) => account.id === key
                  );
                  if (selected) {
                    field.onChange(selected); // Update React Hook Form state
                    setValue("account", selected); // Set selected account
                    setInputValue(selected.name);
                  }
                }}
              >
                <div className="p-2 font-semibold">Accounts</div>
                {filteredAccounts.map((account) => (
                  <div
                    key={account.id}
                    onClick={() => {
                      field.onChange(account); // Update form state
                      setValue("account", account); // Set selected account
                      setInputValue(account.name); // Set input value
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {account.name}
                  </div>
                ))}
              </ListBox>
            )}
          </>
        )}
      />

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Send Invite
      </button>
    </form>
  );
};

export default Combobox;
