import express from 'express';

const app = express();

// Add a simple route to test
app.get('/', (req, res) => {
  res.send('Kaam start kro ');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
