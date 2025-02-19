import express from 'express';
import path from 'path';

const app = express();
const port = 81;

const __dirname = import.meta.dirname;

// Serve static files
app.use(express.static(path.join(__dirname, 'Documentation')));

// index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Documentation', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
