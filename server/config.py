from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api, Resource
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

load_dotenv()

# Get the DATABASE_URI from environment variables
DATABASE_URI = os.getenv('DATABASE_URI')

# Ensure DATABASE_URI is set
if not DATABASE_URI:
    raise ValueError("No DATABASE_URI set for Flask application")

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)

CORS(app,
     origins=["https://lawnbull-arcade.vercel.app", "http://localhost:5173", "https://lawnbull.com"],
     supports_credentials=True,
     allow_headers=['Content-Type', 'Authorization'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],  # Added PATCH here
     expose_headers=['Access-Control-Allow-Origin'],
     max_age=3600
)





api = Api(app)

