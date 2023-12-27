const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const {registerUser, loginUser} = require('./controllers/auth');
const {dashBoardData} = require('./controllers/dashboard');
const {getUserData} = require('./controllers/getUserData');
const {saveSocials, saveProfile, saveLinks} = require('./controllers/saveItems');
const {loadSocials, loadLinks} = require('./controllers/loadPrevious');
const cors = require('cors');

require('dotenv').config()

app.use(cors());
app.use(express.json());

// mongodb+srv://Linklist:SyH60BSNvozY43ub@cluster0.0lhiktm.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(process.env.MONGO_URI).then(() => (console.log('mongodb connected'))).catch(err=>(console.log(err)));

app.get('/', (req, res) => {
    res.send('hello');
});

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/data/dashboard', dashBoardData);
app.post('/save/socials', saveSocials);
app.post('/save/profile', saveProfile)
app.post('/load/socials', loadSocials);
app.get('/get/:handle', getUserData);
app.post('/save/links', saveLinks)
app.post('/load/links', loadLinks)
// app.get('/get/socials/:handle', getUserSocials);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});