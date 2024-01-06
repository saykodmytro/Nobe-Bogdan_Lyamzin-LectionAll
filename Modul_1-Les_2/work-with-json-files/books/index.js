const fs = require("fs/promises"); // для роботи з файлами використовується пакет fs , але щоб зручно було працювати з async await його імпортують із папки /promises
const path = require("path"); // за допомог пакету path створуємо шляхи, він вбудований в node його не потрібно встановлювати
// const { nanoid } = require("nanoid");

const booksPath = path.join(__dirname, "books.json"); // path має метод join який обєднує шляхи, нормалізує шлях

const { nanoid } = require("nanoid");

const getAll = async () => {
  const data = await fs.readFile(booksPath);
  return JSON.parse(data); // необхідно пам'ятати, що параметр data у функції readFile містить вже згадуваний об'єкт типу Buffer містить послідовність прочитаних байтів, тобто сирі дані. Але JSON.parse також перетворює Buffer на масив обєктів
};

// для отримання однієї книги по id ми використовуємо нашу ф-ю getAll запизуємо її результат і методом find знаходимо нашу книгу
const getById = async (id) => {
  const books = await getAll();
  const result = books.find((item) => item.id === id);
  return result || null;
};

// для додавання книги робимо наступне: спочатку створюємо нову книгу на основі наших даних (розпилюємо і додаємо id), потім витягуємо всі наші книги і пушимо нашу нову книгу, дальше перепизуємо нашу книгу і , щоб коректно записалось не в одну строку додаємо опції.
// В stringify можна передати три аргумента, перший наш обєкт , другий символи заміни - якщо під час перетворення масива або обєкта нам треба один символ замінити на інший ми їх пишемо другим аргументом. Третій аргумент - відступи, якщо вказати 1 або більше то stringify запише не в одну строку а нормально
const add = async (data) => {
  const newBook = {
    id: nanoid(),
    ...data,
  };
  const books = await getAll();
  books.push(newBook);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return newBook;
};

// Отримаємо всі книги, дальше потрібно знайти цю книгу яку потрібно оновити. Робимо перевірку якщо не знайдемо нашу книгу , перезаписуємо книгу
const updateById = async (id, data) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.id === id);
  console.log("index: ", index);
  if (index === -1) {
    return null;
  }
  books[index] = { id, ...data }; //  перезаписуємо книгу
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2)); //  перезаписуємо  JSON
  return books[index]; // повертаємо перезаписану книгу
};

const deleteById = async (id) => {
  const books = await getAll(); // отримаємо всі книги
  const index = books.findIndex((item) => item.id === id); // знаходимо її індекс
  if (index === -1) {
    // Робимо перевірку чи є книга
    return null;
  }
  const result = books.splice(index, 1); // видаляємо по індексу і результат запис в змінну
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
