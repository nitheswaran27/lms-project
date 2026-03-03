const express = require('express');
const courses = require('./courses.json');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan

const app = express();
const PORT = 5000;

app.use(cors());
app.use(morgan('dev')); // Use morgan for request logging

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const course = courses.find(c => c.id === courseId);
  if (course) {
    res.json(course);
  } else {
    res.status(404).send('Course not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
