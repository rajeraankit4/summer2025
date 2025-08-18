const DeactivateAccount = () => {
  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      console.log("Deactivation request sent");
      // TODO: Call API for deactivation
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-red-600">Deactivate Account</h3>
      <p className="text-gray-600 mb-4">
        Deactivating your account will disable all access and prevent new expenses
        from being added. You can contact support to reactivate later.
      </p>
      <button
        onClick={handleDeactivate}
        className="w-full bg-red-600 text-white p-2 rounded-lg"
      >
        Deactivate Account
      </button>
    </div>
  );
};

export default DeactivateAccount;
