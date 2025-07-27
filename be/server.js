const app = require('./app');

const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log(process.env.DB_HOST);
  console.log(`Server running on http://localhost:${PORT}`);
});
