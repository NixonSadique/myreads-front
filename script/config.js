const baseUrl = 'https://myreads-4sp9.onrender.com';

const authPath = '/myreads/auth/login';
const createUserPath = '/myreads/user/create';

const searchBookPath = '/myreads/books/search/{query}';
const getBookPath = '/myreads/books/get/{query}';
const similaarBookPath = '/myreads/books/similar/{id}';
const searchAuthorsPath = '/myreads/books/authors/{query}';

const createProgressPath = "/myreads/progress/create";
const updateProgressPath = "/myreads/progress/update/{id}{completion}";
const getUserProgressPath = "/myreads/progress/get/user/{id}";