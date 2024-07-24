const Book = require('../models/bookModel');
const Library = require('../models/libraryModel');
const User = require('../models/userModel');

// List all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'name')
      .populate('borrower', 'name')
      .populate('library', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('fetch_books_failed'),
      error: error.message,
    });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author', 'name')
      .populate('borrower', 'name')
      .populate('library', 'name');
    if (!book) {
      return res.status(404).json({
        success: false,
        message: req.__('book_not_found'),
      });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('fetch_book_failed'),
      error: error.message,
    });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, library } = req.body;

    const authorUser = await User.findById(author);
    if (!authorUser || authorUser.role !== 'author') {
      return res.status(400).json({
        success: false,
        message: req.__('invalid_author'),
      });
    }

    const libraryData = await Library.findById(library);
    if (!libraryData) {
      return res.status(400).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }

    const book = new Book({
      title,
      author,
      library,
      coverImage: "nocoverPic.jpg",
    });

    await book.save();
    res.status(201).json({
      success: true,
      book,
      message: req.__('book_created'),
    });
    

   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('create_book_failed'),
      error: error.message,
    });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, library } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: req.__('book_not_found'),
      });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.library = library || book.library;

    await book.save();
    res.json({
      success: true,
      book,
      message: req.__('book_updated'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('update_book_failed'),
      error: error.message,
    });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: req.__('book_not_found'),
      });
    }

    res.json({
      success: true,
      message: req.__('book_deleted'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('delete_book_failed'),
      error: error.message,
    });
  }
};




// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
      const { bookId } = req.body;
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({
          success: false,
          message: req.__('book_not_found'),
        });
      }
  
      if (book.borrower) {
        return res.status(400).json({
          success: false,
          message: req.__('book_already_borrowed'),
        });
      }
  
      book.borrower = req.user.id;
      await book.save();
      res.json({
        success: true,
        message: req.__('book_borrowed'),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: req.__('borrow_book_failed'),
        error: error.message,
      });
    }
  };
  
  // Return a book
  exports.returnBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({
          success: false,
          message: req.__('book_not_found'),
        });
      }
  
      if (book.borrower.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: req.__('not_authorized_to_return'),
        });
      }
  
      book.borrower = null;
      await book.save();
      res.json({
        success: true,
        message: req.__('book_returned'),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: req.__('return_book_failed'),
        error: error.message,
      });
    }
  };