const LandingPage= () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/mess" element={<MessManagement />} />
        <Route path="/canteen" element={<CanteenManagement />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
export default LandingPage;