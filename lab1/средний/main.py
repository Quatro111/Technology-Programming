num = int(input("Введите четырехзначное число: "))

thousands = num // 1000
hundreds = (num // 100) % 10
tens = (num // 10) % 10
ones = num % 10

print("Тысячи:", thousands)
print("Сотни:", hundreds)
print("Десятки:", tens)
print("Единицы:", ones)
