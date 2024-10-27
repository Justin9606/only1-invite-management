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
  accountName: string;
}

const Combobox: React.FC<ComboboxProps> = ({ accounts, onInvite }) => {
  const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: { accountName: "" },
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
    setValue("accountName", value); // Update the form value with free text
  };

  const onSubmit = handleSubmit(({ accountName }) => {
    if (accountName.trim() === "") {
      alert("Please enter or select an account to invite.");
      return;
    }

    const selectedAccount = accounts.find(
      (account) => account.name.toLowerCase() === accountName.toLowerCase()
    );

    const accountToInvite = selectedAccount || {
      id: Math.random().toString(),
      name: accountName,
    };
    onInvite(accountToInvite);

    reset();
    setInputValue("");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <Controller
        name="accountName"
        control={control}
        render={({ field }) => (
          <>
            <Label className="font-semibold">Account:</Label>
            <Input
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search or enter account..."
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
                    field.onChange(selected.name); // Update form state
                    setValue("accountName", selected.name); // Set selected account
                    setInputValue(selected.name); // Set input value
                  }
                }}
              >
                <div className="p-2 font-semibold">Accounts</div>
                {filteredAccounts.map((account) => (
                  <div
                    key={account.id}
                    onClick={() => {
                      field.onChange(account.name); // Update form state
                      setValue("accountName", account.name); // Set selected account
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
