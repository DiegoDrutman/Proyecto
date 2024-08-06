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
