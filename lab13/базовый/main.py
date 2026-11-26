products = []

while True:
    print("\n1. Добавить товар")
    print("2. Удалить товар")
    print("3. Показать список")
    print("0. Выход")

    choice = input("Выберите действие: ")

    if choice == "1":
        name = input("Название товара: ")
        products.append(name)
        print("Товар добавлен.")

    elif choice == "2":
        name = input("Название товара: ")
        if name in products:
            products.remove(name)
            print("Товар удален.")
        else:
            print("Товар не найден.")

    elif choice == "3":
        if products:
            print("Список покупок:", products)
        else:
            print("Список пуст.")

    elif choice == "0":
        break

    else:
        print("Неверный выбор.")
