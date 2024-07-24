const schemas = require("../utils/RequestValidators/library.scheme");
const middleware = require("../middlewares/validationMiddleware");
const auth = require("../middlewares/auth");

module.exports = (router) => {
    const libraryController = require('../controllers/libraryController');

    //Libraries API
    router.get('/libraries', auth.grantAccess(), libraryController.getAllLibraries);
    router.get('/libraries/:id', auth.grantAccess(), libraryController.getLibraryById);
    router.post('/libraries', auth.grantAccess(), middleware(schemas.libraryAdd),  libraryController.createLibrary);
    router.put('/libraries/:id', auth.grantAccess(), middleware(schemas.libraryEdit),  libraryController.updateLibrary);
    router.delete('/libraries/:id', auth.grantAccess(),  libraryController.deleteLibrary);

    // Library Inventory API
    router.get('/libraries/:id/inventory', auth.grantAccess(), libraryController.getLibraryInventory);
    router.post('/libraries/:id/inventory', auth.grantAccess(), auth.authorizeLibraryActions,  libraryController.addBookToLibrary);
    router.delete('/libraries/:id/inventory/:bookId', auth.grantAccess(), auth.authorizeLibraryActions,  libraryController.removeBookFromLibrary);
};