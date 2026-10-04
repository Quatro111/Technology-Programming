class Library:
    def __init__(self, name):
        self.name = name
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def remove_book(self, book):
        if book in self.books:
            self.books.remove(book)

    def find_book(self, book):
        if book in self.books:
            return True
        return False

    def show_books(self):
        for book in self.books:
            print("-", book)

    def show_name(self):
        print("Название библиотеки:", self.name)


library = Library("Городская библиотека")

library.add_book("Превращение")
library.add_book("Война и мир")
library.add_book("Преступление и наказание")

library.show_name()

print("Книги:")
library.show_books()

print("\nПоиск:")
if library.find_book("Преступление и наказание"):
    print("Книга найдена.")
else:
    print("Книга не найдена.")

print("\nУдаление:")
library.remove_book("Война и мир")
library.show_books()
