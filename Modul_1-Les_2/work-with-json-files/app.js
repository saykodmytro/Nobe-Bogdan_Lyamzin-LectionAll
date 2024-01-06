const books = require("./books"); // імпорт іде зі папки books але насправді він іде від папки index.js. З index.js експортуються методи для роботи з цими книгами
// console.log("books: ", books);

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "read":
      const allBooks = await books.getAll();
      return console.log(allBooks);
    case "getById":
      const oneBook = await books.getById(id);
      return console.log(oneBook);
    case "add":
      const newBook = await books.add({ title, author });
      return console.log(newBook);
    case "updateById":
      const updateBook = await books.updateById(id, { title, author });
      return console.log(updateBook);
    case "deleteById":
      const deleteBook = await books.deleteById(id);
      return console.log(deleteBook);
  }
};

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "3" });
// invokeAction({ action: "add", title: "Worm", author: "John C. McCrae" });
// invokeAction({
//   action: "updateById",
//   id: "8",
//   title: "XXX",
//   author: "XXXXXX",
// });
invokeAction({ action: "deleteById", id: "6" });
