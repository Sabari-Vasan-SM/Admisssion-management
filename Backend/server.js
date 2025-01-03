const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.use(express.json({ limit: '10mb' }));


app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/college-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define the Application schema
const applicationSchema = new mongoose.Schema({
  name: String,
  aadhar: String,
  emis: String,
  cutoff: String,
  totalMarks: String,
  dob: String,
  phone: String,
  address: String,
  department: String,
  photo: String,
  status: { type: String, default: 'Pending' },
});

const Application = mongoose.model('Application', applicationSchema);



// Routes
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Endpoint to fetch applications
app.get('/applications', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// Endpoint to add a new application
app.post('/applications', async (req, res) => {
  const newApplication = new Application(req.body);
  await newApplication.save();
  res.json({ message: 'Application submitted successfully!' });
});

// Update application status
app.put('/applications/:id/status', async (req, res) => {
  const { status } = req.body;
  const application = await Application.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: 'Status updated successfully!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
