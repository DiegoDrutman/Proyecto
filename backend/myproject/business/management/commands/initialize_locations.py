from django.core.management.base import BaseCommand
from business.models import Location  # Asegúrate de ajustar 'myapp' al nombre de tu aplicación

class Command(BaseCommand):
    help = 'Inicializa las ubicaciones predefinidas en la base de datos'

    def handle(self, *args, **kwargs):
        locations = [
            {'name': 'Hurlingham', 'postal_code': '1686'},
            {'name': 'Morón', 'postal_code': '1708'},
            {'name': 'Ituzaingó', 'postal_code': '1714'},
            {'name': 'Palomar', 'postal_code': '1684'},
        ]

        for loc in locations:
            location, created = Location.objects.get_or_create(name=loc['name'], postal_code=loc['postal_code'])
            if created:
                self.stdout.write(self.style.SUCCESS(f'Ubicación "{loc["name"]}" creada con éxito.'))
            else:
                self.stdout.write(self.style.WARNING(f'Ubicación "{loc["name"]}" ya existe.'))
