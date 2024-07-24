const Library = require('../models/libraryModel');
const Book = require('../models/bookModel');

// List all libraries
exports.getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    // res.json(libraries);
    res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: libraries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('fetch_libraries_failed'),
      error: error.message,
    });
  }
};

// Get library by ID
exports.getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate({
      path: 'books',
      populate: { path: 'borrower', select: 'name' },
    });

    if (!library) {
      return res.status(404).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }
    res.status(200).json({
      success: true,
      message: "Data Fetched By Id Successfully",
      data: library,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('fetch_library_failed'),
      error: error.message,
    });
  }
};

// Create a new library
exports.createLibrary = async (req, res) => {
  try {
    const { name, address } = req.body;

    const library = new Library({
      name,
      address,
    });

    await library.save();
    res.status(201).json({
      success: true,
      library,
      message: req.__('library_created'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('create_library_failed'),
      error: error.message,
    });
  }
};

// Update a library by ID
exports.updateLibrary = async (req, res) => {
  try {
    const { name, address } = req.body;
    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }

    library.name = name || library.name;
    library.address = address || library.address;

    await library.save();
    res.json({
      success: true,
      library,
      message: req.__('library_updated'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('update_library_failed'),
      error: error.message,
    });
  }
};

// Delete a library by ID
exports.deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndRemove(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }

    res.json({
      success: true,
      message: req.__('library_deleted'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('delete_library_failed'),
      error: error.message,
    });
  }
};

// Get library inventory
exports.getLibraryInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate('books');
    if (!library) {
      return res.status(404).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }
    res.status(200).json({
      success: true,
      message: "library inventory Data Fetched Successfully",
      data: library.books,
    });
    // res.json(library.books);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('fetch_inventory_failed'),
      error: error.message,
    });
  }
};

// Add a book to library inventory
exports.addBookToLibrary = async (req, res) => {
  try {
    const { bookId } = req.body;
    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: req.__('book_not_found'),
      });
    }

    library.books.push(bookId);
    await library.save();
    res.json({
      success: true,
      message: req.__('book_added_to_inventory'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('add_to_inventory_failed'),
      error: error.message,
    });
  }
};

// Remove a book from library inventory
exports.removeBookFromLibrary = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: req.__('library_not_found'),
      });
    }

    const bookIndex = library.books.indexOf(req.params.bookId);
    if (bookIndex === -1) {
      return res.status(404).json({
        success: false,
        message: req.__('book_not_found_in_inventory'),
      });
    }

    library.books.splice(bookIndex, 1);
    await library.save();
    res.json({
      success: true,
      message: req.__('book_removed_from_inventory'),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.__('remove_from_inventory_failed'),
      error: error.message,
    });
  }
};
