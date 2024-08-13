from django.core.management.base import BaseCommand
from business.models import Business, Product
from django.core.files import File
from PIL import Image
import os

class Command(BaseCommand):
    help = 'Clears all existing businesses and adds new sample businesses to the database'

    def create_sample_image(self, name, type='businesses'):
        """Genera una imagen de muestra y la guarda en la carpeta media."""
        image = Image.new('RGB', (300, 300), color=(73, 109, 137))
        media_path = os.path.join('media', type)
        os.makedirs(media_path, exist_ok=True)  # Asegúrate de que el directorio exista
        image_path = os.path.join(media_path, f'{name}.png')
        image.save(image_path)
        return image_path

    def add_business(self, name, description, category, address, operating_hours, image_path=None, products=None):
        business = Business(
            name=name,
            description=description,
            category=category,
            address=address,
            operating_hours=operating_hours
        )

        # Asignar una imagen proporcionada o generar una imagen de muestra
        if image_path and os.path.exists(image_path):
            with open(image_path, 'rb') as image_file:
                business.image.save(f'{name.replace(" ", "_")}.png', File(image_file), save=True)
        else:
            generated_image_path = self.create_sample_image(name.replace(" ", "_"))
            with open(generated_image_path, 'rb') as image_file:
                business.image.save(f'{name.replace(" ", "_")}.png', File(image_file), save=True)

        business.save()

        if products:
            for product_name, product_desc, product_price in products:
                product_image_path = self.create_sample_image(product_name.replace(" ", "_"), type='products')
                with open(product_image_path, 'rb') as image_file:
                    product = Product(
                        business=business,
                        name=product_name,
                        description=product_desc,
                        price=product_price
                    )
                    product.image.save(f'{product_name.replace(" ", "_")}.png', File(image_file), save=True)
                    product.save()

        self.stdout.write(self.style.SUCCESS(f"Business '{name}' added successfully with products."))

    def handle(self, *args, **kwargs):
        # Borrar todos los negocios existentes
        Business.objects.all().delete()
        self.stdout.write(self.style.WARNING("All existing businesses have been deleted."))

        # Agregar algunos negocios de ejemplo con productos
        self.add_business(
            name="Café del Centro",
            description="Un lugar acogedor para disfrutar de un buen café.",
            category="Cafetería",
            address="Av. Principal 123, Ciudad",
            operating_hours="Lunes a Viernes: 8:00 AM - 10:00 PM",
            products=[
                ("Café Americano", "Café negro fuerte", 2.50),
                ("Café con Leche", "Café con leche espumosa", 3.00),
            ]
        )

        self.add_business(
            name="Tienda de Ropa El Estilo",
            description="Tienda de moda con las últimas tendencias.",
            category="Tienda de Ropa",
            address="Calle Falsa 456, Ciudad",
            operating_hours="Lunes a Sábado: 10:00 AM - 8:00 PM",
            products=[
                ("Camisa Casual", "Camisa de algodón para uso diario", 25.00),
                ("Pantalón Jeans", "Jeans de mezclilla azul", 40.00),
            ]
        )

        self.add_business(
            name="Restaurante La Buena Mesa",
            description="Deliciosos platillos para toda la familia.",
            category="Restaurante",
            address="Calle del Sabor 789, Ciudad",
            operating_hours="Todos los días: 12:00 PM - 11:00 PM",
            products=[
                ("Ensalada César", "Ensalada con aderezo César", 8.50),
                ("Pizza Margarita", "Pizza con tomate, mozzarella y albahaca", 12.00),
            ]
        )

        self.stdout.write(self.style.SUCCESS("All businesses added successfully with products."))
