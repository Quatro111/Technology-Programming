number = int(input("Введите трехзначное число: "))

hundreds = number // 100
tens = number // 10 % 10
units = number % 10

print("Сотни:", hundreds)
print("Десятки:", tens)
print("Единицы:", units)
