from django.utils.deprecation import MiddlewareMixin

class BusinessMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Si no hay usuarios, esta lógica puede ser eliminada o ajustada según tus necesidades.
        request.business = None  # No hay lógica para manejar usuarios o negocios aquí.
