// backend/server.js

const express 		= 	require('express');
const connectDB 	= 	require('./db');
const cors 			= 	require('cors');
const bodyParser 	= 	require('body-parser');
const itemRoutes 	= 	require('./routes/itemRoutes');

const API_URL = 'http://localhost:5001/api';


const app 	= 	express();
connectDB(); // Connect to MongoDB

app.use(cors());
app.use(bodyParser.json());
app.use('/api', itemRoutes);


const PORT 	= 	process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
