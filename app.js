const dotenv = require("dotenv")
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const book = require("./db/model/bookSchema")
app.use(express.json())
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT
require("./db/connection")

dotenv.config({ path: "./config.env" })

app.get("/", async (req, res) => {
    try {
        const bookexist = await book.find()
        if (!bookexist) {
            return res.status(404).json({
                success: false,
                message: "No Book Found",
            });
        }
        res.status(200).json({
            success: true
            , data: bookexist
        });
    } catch (err) {
        console.log(err);

    }
})

app.post("/addProducts", async (req, res) => {
    const { name, author, description, price, imageUrl } = req.body;
    if (!name || !author || !description || !price || !imageUrl) {
        res.status(404).json({ message: "please fill all the filds" })
    }
    try {

        const bookexist = await book.findOne({ name: name })
        if (bookexist) {
            return res.status(422).json({ error: "book already exist" })
        }
        const newBook = new book({ name, author, description, price, imageUrl })
        await newBook.save();
        res.status(201).json({ message: "successful stored db" })
    } catch (err) {
        console.log(err);

    }
});
app.get("/Books", async (req, res) => {
    try {
        const bookexist = await book.find()
        if (!bookexist) {
            return res.status(404).json({
                success: false,
                message: "No Book Found",
            });
        }
        res.status(200).json({
            success: true
            , data: bookexist
        });
    } catch (err) {
        console.log(err);

    }
})

app.post("/updateBook/:nm", async (req, res) => {
    const { author, description, price, imageUrl } = req.body;
    const nm = req.params.nm;
    if (!author || !description || !price || !imageUrl) {
        return res.status(422).json({ message: "please fill all the filds" })
    }
    try {
        const bookexist = await book.findOneAndUpdate(
            { name: nm }, { author, description, price, imageUrl })
        if (bookexist) {
            return res.status(200).json({ msg: "book updated" })
        }
        else {
            return res.status(422).json({ msg: "book not updated" })
        }
    } catch (err) {
        console.log("update cha err");

    }
})

app.post("/:nm", async (req, res) => {
    const nm = req.params.nm;
    const booktoDelete = await book.deleteOne({ name: nm })
    if (booktoDelete) {
       // return res.redirect("/")
         return res.status(200).json({ message: "deleted" });
    }
})
app.get("/searchBook/:nm", async(req, res) => {
    try {
        const nm=req.params.nm
        console.log(nm);
        const bookexist = await book.findOne({name:nm})
        if (!bookexist) {
            return res.status(404).json({
                success: false,
                message: "No Book Found",
            });
        }
        res.status(200).json({
            success: true
            , data: bookexist
        });
    } catch (err) {
        console.log(err);

    }
})
app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    });
});


app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});