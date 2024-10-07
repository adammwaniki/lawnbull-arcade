# Library imports
from sqlalchemy import DateTime, func, Column, Integer, String, Float, ForeignKey, Text, BigInteger, Numeric, Boolean
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

# Local imports
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    public_id = Column(String(50), unique=True)
    username = Column(String(50))
    password = Column(String(80))
    admin = Column(Boolean)
    email = Column(String(50))

    def __repr__(self):
        return f'<User (id={self.id}, {self.user_name}, email={self.email})>'


class Business(db.Model, SerializerMixin):
    __tablename__ = 'business'
    id = Column(Integer, primary_key=True)
    business_identifier = Column(String(32), unique=True, default=lambda: str(uuid.uuid4().hex), index=True)
    name = Column(String(50), index=True)
    postal_address = Column(String(50))
    city = Column(String(50))
    county = Column(String(50))
    postal_code = Column(String(50))
    country = Column(String(50))
    phone_number = Column(String(50))
    email = Column(String(50))
    website = Column(String(130))
    description = Column(String)
    hours = Column(String(50))
    price_range = Column(String(50))
    image_url = Column(String)
    # user_id = Column(Integer, ForeignKey('user.id'))  # If the app grows we can implement this 
    # user = relationship('User', backref='businesses')

    def __repr__(self):
        return f'<Business (id={self.id}, {self.name}, {self.postal_address}, {self.city}, {self.county}, {self.postal_code}, {self.country}, {self.phone_number}, {self.email}, {self.website}, {self.description}, {self.hours}, {self.price_range}, {self.image_url})>'
