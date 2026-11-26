def check_brackets(text):
    stack = []

    pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    }

    for char in text:
        if char in "([{":
            stack.append(char)

        elif char in ")]}":
            if not stack:
                return False

            if stack.pop() != pairs[char]:
                return False

    return len(stack) == 0


text = input("Введите последовательность скобок: ")

if check_brackets(text):
    print("Скобки расставлены правильно.")
else:
    print("Ошибка в последовательности скобок.")
