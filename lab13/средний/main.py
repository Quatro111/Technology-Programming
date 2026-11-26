import string

text = input("Введите текст: ")

text = text.lower()

for char in string.punctuation + "«»—…":
    text = text.replace(char, " ")

words = text.split()

frequency = {}

for word in words:
    frequency[word] = frequency.get(word, 0) + 1

print("\nЧастота слов:")

for word, count in frequency.items():
    print(word, "-", count)

print("\nТоп-5 частых слов:")

top_words = sorted(frequency.items(), key=lambda x: x[1], reverse=True)

for word, count in top_words[:5]:
    print(word, "-", count)
