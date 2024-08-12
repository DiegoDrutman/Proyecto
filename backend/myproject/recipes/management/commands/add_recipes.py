from django.core.management.base import BaseCommand
from recipes.models import Recipe  # Asegúrate de que este import esté correcto
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
                "steps": [
                    "Cocina la pasta en una olla con agua hirviendo con sal hasta que esté al dente.",
                    "Mientras tanto, fríe la panceta en una sartén hasta que esté dorada y crujiente.",
                    "En un bol, bate los huevos y mezcla con el queso parmesano.",
                    "Cuando la pasta esté lista, escúrrela y mézclala rápidamente con la panceta y los huevos.",
                    "Decora con perejil fresco y sirve inmediatamente."
                ],
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
                "steps": [
                    "Corta el pollo en tiras y sazónalo con sal, pimienta, comino y pimentón.",
                    "En una sartén grande, calienta el aceite de oliva y cocina el pollo hasta que esté dorado.",
                    "Agrega la cebolla y los pimientos a la sartén y cocina hasta que estén tiernos.",
                    "Sirve el pollo y los vegetales en tortillas calientes, adornando con cilantro fresco y un toque de lima."
                ],
                "preparation_time": 25,
                "image": "recipes/tacos_de_pollo.webp"  # Nombre de archivo de imagen
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
                "steps": [
                    "Forma 4 hamburguesas con la carne molida y sazónalas con sal y pimienta.",
                    "Cocina las hamburguesas en una parrilla o sartén hasta que estén a tu gusto.",
                    "Coloca una rebanada de queso sobre cada hamburguesa y deja que se derrita.",
                    "Arma las hamburguesas colocando la carne con queso en los panes, y añade lechuga, tomate y cebolla.",
                    "Adereza con ketchup, mostaza y mayonesa al gusto."
                ],
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
                steps=recipe_data["steps"],  # Agrega los pasos
                preparation_time=recipe_data["preparation_time"],
                image=recipe_data["image"] if os.path.exists(image_path) else None  # Verifica que la imagen exista
            )
            self.stdout.write(self.style.SUCCESS(f'Receta "{recipe.name}" creada con éxito.'))
