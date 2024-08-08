from django.core.management.base import BaseCommand
from recipes.models import Recipe  # Ajusta el import si tu app se llama diferente
import os

class Command(BaseCommand):
    help = 'Borra las recetas existentes y añade recetas predeterminadas a la base de datos'

    def handle(self, *args, **kwargs):
        # Borra todas las recetas existentes
        Recipe.objects.all().delete()
        self.stdout.write(self.style.WARNING('Todas las recetas existentes han sido borradas.'))

        # Lista de recetas para agregar
        recipes = [
            {
                "name": "Pasta Carbonara",
                "description": "Una deliciosa pasta italiana con panceta y queso parmesano, perfecta para una cena rápida y sabrosa.",
                "ingredients": {
                    "Pasta": "200 g de pasta (espagueti o fettuccine)",
                    "Panceta": "100 g de panceta o bacon en cubos",
                    "Huevos": "2 huevos grandes",
                    "Parmesano": "50 g de queso parmesano rallado",
                    "Ajo": "1 diente de ajo (opcional)",
                    "Condimentos": "Sal y pimienta al gusto",
                    "Perejil": "Perejil fresco picado para decorar"
                },
                "preparation_time": 30,  # Tiempo de preparación en minutos
                "image": "recipes/pasta_carbonara.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Tacos de Pollo",
                "description": "Tacos de pollo jugosos y llenos de sabor, perfectos para una comida rápida y deliciosa.",
                "ingredients": {
                    "Pollo": "500 g de pechuga de pollo, cortada en tiras",
                    "Cebolla": "1 cebolla mediana, cortada en rodajas",
                    "Pimientos": "2 pimientos (uno rojo y uno verde), en rodajas",
                    "Aceite de Oliva": "2 cucharadas de aceite de oliva",
                    "Condimentos": "1 cucharadita de comino, 1 cucharadita de pimentón, 1 cucharadita de ajo en polvo, sal y pimienta al gusto",
                    "Extras": "Tortillas de maíz o harina, cilantro fresco y lima para servir"
                },
                "preparation_time": 25,
                "image": "recipes/tacos_de_pollo.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Ensalada César",
                "description": "Una ensalada clásica y fresca con lechuga crujiente, crutones y un delicioso aderezo César.",
                "ingredients": {
                    "Lechuga": "1 lechuga romana, cortada en trozos",
                    "Parmesano": "50 g de queso parmesano rallado",
                    "Crutones": "100 g de crutones",
                    "Pollo": "2 pechugas de pollo, a la parrilla y cortadas en tiras",
                    "Ajo": "1 diente de ajo picado",
                    "Aderezo": "4 filetes de anchoa (opcional), 3 cucharadas de aceite de oliva, 1 cucharadita de mostaza de Dijon, 1 cucharada de jugo de limón, sal y pimienta al gusto"
                },
                "preparation_time": 20,
                "image": "recipes/ensalada_cesar.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Pizza Margherita",
                "description": "Pizza clásica italiana con tomate, mozzarella y albahaca fresca.",
                "ingredients": {
                    "Masa": "1 base de pizza",
                    "Tomate": "200 g de salsa de tomate",
                    "Mozzarella": "150 g de mozzarella fresca",
                    "Albahaca": "Hojas de albahaca fresca",
                    "Aceite de Oliva": "1 cucharada de aceite de oliva",
                    "Condimentos": "Sal y pimienta al gusto"
                },
                "preparation_time": 15,
                "image": "recipes/pizza_margherita.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Sushi Rolls",
                "description": "Rollos de sushi frescos y deliciosos con pescado y vegetales.",
                "ingredients": {
                    "Arroz": "2 tazas de arroz para sushi",
                    "Alga": "8 hojas de alga nori",
                    "Pescado": "200 g de salmón o atún fresco",
                    "Pepino": "1 pepino, cortado en tiras",
                    "Aguacate": "1 aguacate, cortado en tiras",
                    "Vinagre": "2 cucharadas de vinagre de arroz",
                    "Condimentos": "Salsa de soja, wasabi y jengibre en conserva"
                },
                "preparation_time": 40,
                "image": "recipes/sushi_rolls.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Chili con Carne",
                "description": "Un guiso de carne picante y sabroso, perfecto para días fríos.",
                "ingredients": {
                    "Carne": "500 g de carne molida",
                    "Frijoles": "400 g de frijoles rojos",
                    "Tomate": "400 g de tomates triturados",
                    "Cebolla": "1 cebolla grande, picada",
                    "Ajo": "2 dientes de ajo, picados",
                    "Pimientos": "1 pimiento rojo, picado",
                    "Condimentos": "2 cucharaditas de comino, 1 cucharadita de pimentón, 1 cucharadita de chile en polvo, sal y pimienta al gusto"
                },
                "preparation_time": 60,
                "image": "recipes/chili_con_carne.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Paella",
                "description": "Un plato español clásico con arroz, mariscos y vegetales.",
                "ingredients": {
                    "Arroz": "2 tazas de arroz para paella",
                    "Mariscos": "300 g de mezcla de mariscos",
                    "Caldo": "4 tazas de caldo de pescado",
                    "Tomate": "200 g de tomates triturados",
                    "Pimientos": "1 pimiento rojo, cortado en tiras",
                    "Guisantes": "100 g de guisantes",
                    "Ajo": "2 dientes de ajo, picados",
                    "Condimentos": "1 cucharadita de azafrán, sal y pimienta al gusto"
                },
                "preparation_time": 50,
                "image": "recipes/paella.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Curry de Garbanzos",
                "description": "Un curry vegetariano lleno de sabor y especias.",
                "ingredients": {
                    "Garbanzos": "400 g de garbanzos cocidos",
                    "Cebolla": "1 cebolla grande, picada",
                    "Ajo": "2 dientes de ajo, picados",
                    "Jengibre": "1 trozo de jengibre fresco, rallado",
                    "Tomate": "400 g de tomates triturados",
                    "Leche de Coco": "400 ml de leche de coco",
                    "Espinacas": "200 g de espinacas frescas",
                    "Condimentos": "2 cucharaditas de curry en polvo, 1 cucharadita de cúrcuma, 1 cucharadita de comino, sal y pimienta al gusto"
                },
                "preparation_time": 35,
                "image": "recipes/curry_de_garbanzos.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Brownies",
                "description": "Deliciosos brownies de chocolate, perfectos para los amantes del dulce.",
                "ingredients": {
                    "Chocolate": "200 g de chocolate negro",
                    "Mantequilla": "100 g de mantequilla",
                    "Azúcar": "200 g de azúcar",
                    "Huevos": "3 huevos",
                    "Harina": "100 g de harina",
                    "Nueces": "100 g de nueces (opcional)",
                    "Vainilla": "1 cucharadita de extracto de vainilla"
                },
                "preparation_time": 45,
                "image": "recipes/brownies.webp"  # Nombre de archivo de imagen
            },
            {
                "name": "Hamburguesa Clásica",
                "description": "Jugosa hamburguesa con queso, lechuga, tomate y cebolla.",
                "ingredients": {
                    "Carne": "500 g de carne molida",
                    "Pan": "4 panes de hamburguesa",
                    "Queso": "4 rebanadas de queso cheddar",
                    "Lechuga": "Hojas de lechuga",
                    "Tomate": "1 tomate, en rodajas",
                    "Cebolla": "1 cebolla, en rodajas",
                    "Condimentos": "Sal y pimienta al gusto, ketchup, mostaza y mayonesa"
                },
                "preparation_time": 20,
                "image": "recipes/hamburguesa_clasica.webp"  # Nombre de archivo de imagen
            }
        ]

        # Ruta base para las imágenes (ajusta según tu configuración)
        base_image_path = os.path.join(os.getcwd(), 'media')

        for recipe_data in recipes:
            # Construir la ruta completa de la imagen
            image_path = os.path.join(base_image_path, recipe_data["image"])
            recipe = Recipe.objects.create(
                name=recipe_data["name"],
                description=recipe_data["description"],
                ingredients=recipe_data["ingredients"],
                preparation_time=recipe_data["preparation_time"],
                image=recipe_data["image"] if os.path.exists(image_path) else None  # Verifica que la imagen exista
            )
            self.stdout.write(self.style.SUCCESS(f'Receta "{recipe.name}" creada con éxito.'))
