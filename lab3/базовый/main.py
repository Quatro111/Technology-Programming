class Rectangle:
    def __init__(self, width, height, color):
        self.width = width
        self.height = height
        self.color = color

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

    def change_color(self, new_color):
        self.color = new_color

    def show_info(self):
        print("Ширина:", self.width)
        print("Высота:", self.height)
        print("Цвет:", self.color)
        print("Площадь:", self.area())
        print("Периметр:", self.perimeter())


rectangle1 = Rectangle(5, 3, "Красный")

rectangle1.show_info()

print("\nИзменение цвета:")
rectangle1.change_color("Синий")
rectangle1.show_info()
