const express = require("express");
const app = express();
const port = 3000;
const admin = require("firebase-admin");

var serviceAccount = require("./use-case-db-464cb-firebase-adminsdk-2u8wr-0491ea4471.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://use-case-db-464cb-default-rtdb.asia-southeast1.firebasedatabase.app",
});

app.use(express.json());
app.use(express.static("public"));

//Open Windows PowerShell with Run as Administrator
//Run this command: Set-ExecutionPolicy Unrestricted
//nodemon

const database = admin.database();
const animeRef = database.ref("/Score");

app.get("/", (req, res) => {
    res.send("index");
});

app.post("/save", (req, res) => {
    animeRef.child(req.body.score_source).push({
        score: req.body.score,
        total: req.body.total,
        name: req.body.name,
    });
});

app.put("/update", (req, res) => {
    const newData = {
        score: req.body.part_change,
        total: req.body.new_val,
        name: req.body.score_name,
    }
    animeRef.child(req.body.key).child(req.body.keys).update(newData);
});

app.delete("/remove", (req, res) => {
    animeRef.child(req.body.score_source).child(req.body.score_name).remove();
});


app.listen(port, () => {
    console.log(`App liseting to port ${port}`);
});