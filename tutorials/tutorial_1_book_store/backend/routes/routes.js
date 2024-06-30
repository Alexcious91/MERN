import express from "express";
import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// retrieve all resources
router.get("/", async (req, res) => {
   try {
      const getBooks = await Book.find({})

      res.status(200).json({
         bookCount: getBooks.length,
         books: getBooks
      })
   } catch(error) {
      console.error(`Error retrieving books: ${error}`)
      res.status(500).send({ error: error.message })
   }
})

// retrieve one resource by id
router.get("/:id", async (req, res) => {
   try {
      const { id } = req.params;

      const getBook = await Book.findById(id)

      res.status(200).json({
         bookCount: getBook.length,
         books: getBook
      });
   } catch(error) {
      console.log(`Error fetching book: ${error}`)
   }
})

// create new resource
router.post("/create", async (req, res) => {
   try {
      const { title, author, publishYear } = req.body;

      if (!title || !author || !publishYear) {
         return res.status(404).send({ message: "Send all required fields: title, author, publishYear" })
      }

      const newBook = {
         title: title,
         author: author,
         publishYear: publishYear
      };

      const saveBook = await Book.create(newBook)

      return res.status(201).send({ message: "Book posted successfully" })
   } catch(error) {
      console.error(`Error posting book: ${error}`)
      res.status(500).send({ error: error.message })
   }
})

// update a resource
router.put("/edit/:id", async (req, res) => {
   try {
      const { title, author, publishYear } = req.body;
      const { id } = req.params;

      if (!title || !author || !publishYear) {
         res.status(400).send({ message: "Send all required fields: title, author, publishYear" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
         res.status(400).send({ message: "Invalid ID" })
      }

      const result = await Book.findByIdAndUpdate(id, {
         title: title,
         author: author,
         publishYear: publishYear
      })

      if (!result) {
         res.status(404).json({ message: "Book not found" });
      }

      res.status(200).send({ message: "Book updated successfully" })
   } catch(error) {
      console.error(`Error updating book: ${error}`)
   }
})

// delete a resource
router.delete("/delete/:id", async (req, res) => {
   try {
      const { id } = req.params
      const book = await Book.findByIdAndDelete(id)

      if (!book) {
         res.status(404).send({ error: "Book not found" })
      }

      res.status(200).send({ message: "Book deleted successfully" })
   } catch(error) {
      console.log(`Error deleting book: ${error}`);
      res.status(400).send({})
   }
})

export default router;