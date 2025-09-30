const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

const { adminAuth, userAuth } = require('./middleWares/auth');

// Apply adminAuth for all /admin routes
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
    res.send('Hello User');
});

app.get("/admin/allData", (req, res) => {
    res.send('All Data Here');
});

app.get("/admin/deleteData", (req, res) => {
    res.send('Data Deleted');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
