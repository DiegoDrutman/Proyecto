from pathlib import Path
import os

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key
SECRET_KEY = 'mc1rsecretkey9'  # Cambia esto a una clave segura para producción

# Debug settings
DEBUG = True  # Cambia a False en producción

# Allowed hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1']  # Agrega tu dominio en producción

# Authentication backends
AUTHENTICATION_BACKENDS = [
    'business.backends.BusinessBackend',  # Autenticación para los negocios
    'django.contrib.auth.backends.ModelBackend',  # Autenticación para CustomerUser
]

AUTH_USER_MODEL = 'business.CustomerUser' 

# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'business',  # Tu aplicación de negocios
]

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Cambia esto para tu frontend en producción
]

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']
CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_HTTPONLY = False  # Esto debe ser True en producción para mayor seguridad
CSRF_COOKIE_SECURE = False  # Cambia a True en producción con HTTPS
SESSION_COOKIE_SECURE = False  # Cambia a True en producción con HTTPS

# Email settings (cambia a variables de entorno en producción)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'diego.drutman@gmail.com'
EMAIL_HOST_PASSWORD = 'eyxw ukjd ymck tggk'  # Cambia a variables de entorno para seguridad
DEFAULT_FROM_EMAIL = 'BizWave <diego.drutman@gmail.com>'
ADMIN_EMAIL = 'diego.drutman@gmail.com'

# Middleware settings
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS headers settings
CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-requested-with',
    'accept',
    'origin',
    'x-csrftoken',
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# URLs settings
ROOT_URLCONF = 'myproject.urls'

# Templates settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI settings
WSGI_APPLICATION = 'myproject.wsgi.application'

# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'mc1rpostgresql9',  # Cambia a una variable de entorno en producción
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Password validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Media settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Static files settings
STATIC_URL = '/static/'

# Localization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Default auto field setting
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
