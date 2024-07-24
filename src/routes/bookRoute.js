const schemas = require("../utils/RequestValidators/book.scheme");
const middleware = require("../middlewares/validationMiddleware");
const auth = require("../middlewares/auth");

module.exports = (router) => {
  const bookController = require("../controllers/bookController");

    // Books API
    router.get('/books', auth.grantAccess(), bookController.getAllBooks);
    router.get('/books/:id', auth.grantAccess(), bookController.getBookById);
    router.post('/books', auth.grantAccess(),  middleware(schemas.bookAdd),  bookController.createBook);
    router.put('/books/:id', auth.grantAccess(), auth.authorize("Author"), middleware(schemas.bookEdit),  bookController.updateBook);
    router.delete('/books/:id', auth.grantAccess(), auth.authorize("Author"),  bookController.deleteBook);
    
    // Borrowing API
    router.post('/borrow', auth.grantAccess(), auth.authorize("Borrower"),  bookController.borrowBook);
    router.put('/return/:id', auth.grantAccess(), auth.authorize("Borrower"),  bookController.returnBook);
};
