class Temperature:
    def __init__(self, celsius, city):
        self.celsius = celsius
        self.city = city

    def to_fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    def to_kelvin(self):
        return self.celsius + 273.15

    def change_temperature(self, new_temperature):
        self.celsius = new_temperature

    def show_info(self):
        print("Город:", self.city)
        print("Температура:", self.celsius, "°C")
        print("Фаренгейт:", self.to_fahrenheit(), "°F")
        print("Кельвин:", self.to_kelvin(), "K")


temperature = Temperature(20, "Алматы")

temperature.show_info()

print("\nПосле изменения температуры:")
temperature.change_temperature(25)
temperature.show_info()
