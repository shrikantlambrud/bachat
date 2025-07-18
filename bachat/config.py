import os

class Config:
    # Flask Secret Key for session management
    # It's highly recommended to use a strong, randomly generated key
    # and load it from an environment variable in production.
    SECRET_KEY = os.environ.get('SECRET_KEY') or os.urandom(24)

    # Database configuration
    # Replace with your actual MySQL credentials
    DB_CONFIG = {
        'host': 'localhost',
        'user': 'root',       # IMPORTANT: Replace with your MySQL username
        'password': 'Shrikant', # IMPORTANT: Replace with your MySQL password
        'database': 'bachat_gat_db'
    }

    # You can add other configurations here, e.g.,
    # MAIL_SERVER = 'smtp.example.com'
    # MAIL_PORT = 587
    # MAIL_USE_TLS = True
    # MAIL_USERNAME = 'your_email@example.com'
    # MAIL_PASSWORD = 'your_email_password'