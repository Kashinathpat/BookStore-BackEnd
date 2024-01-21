import express from "express";
import { Book } from "../Models/BookModels.js";

const BookRouter = express.Router();

// Get all books
BookRouter.get("/", async (request, response) => {
	try {
		const books = await Book.find({});
		return response.status(200).send(books);
	} catch (error) {
		return response.status(500).json({
			message: error
		});
	}
});

// Get Specific Book
BookRouter.get("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const book = await Book.findById(id);
		return response.status(200).send(book);
	} catch (error) {
		return response.status(500).send({
			message: error.message
		});
	}
});

// Delete Book
BookRouter.delete("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const result = await Book.findByIdAndDelete(id);
		if (!result) {
			return response.status(404).send({ message: "Book Not Found" });
		}
		return response.status(200).send({ message: "Book Deleted Successfully" });
	} catch (error) {
		console.log(error.message);
		return response.status(500).send({
			message: error.message
		});
	}
});

// Update Book
BookRouter.put("/:id", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author, publishYear"
			});
		}
		const { id } = request.params;
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear
		};
		const result = await Book.findByIdAndUpdate(id, newBook);

		if (!result) {
			return response.status(404).send({ message: "Book Not Found" });
		}
		return response.status(200).send({ message: "Book Updated Successfully" });
	} catch (error) {
		return response.status(500).send({
			message: error.message
		});
	}
});

// Create Book
BookRouter.post("/", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).json({
				message: `Send all required fields: title, author, publishYear`
			});
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear
		};
		const book = await Book.create(newBook);
		return response.status(200).send(book);
	} catch (error) {
		return response.status(500).send({
			message: error.message
		});
	}
});

export default BookRouter;
