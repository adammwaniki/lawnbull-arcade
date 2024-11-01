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
    password = Column(String(255))
    admin = Column(Boolean)
    email = Column(String(255))

    def __repr__(self):
        return f'<User (id={self.id}, {self.username}, email={self.email})>'


class Business(db.Model, SerializerMixin):
    __tablename__ = 'business'
    
    id = Column(Integer, primary_key=True)
    business_identifier = Column(String(32), unique=True, default=lambda: str(uuid.uuid4().hex), index=True, name='ix_business_identifier')
    name = Column(String(255), index=True)
    subtitle = Column(String(255))
    main_image_url = Column(Text)
    additional_image_url1 = Column(Text)
    additional_image_url2 = Column(Text)
    additional_image_url3 = Column(Text)
    paragraph1 = Column(Text)
    paragraph2 = Column(Text)
    paragraph3 = Column(Text)

    def __repr__(self):
        return f'<Business (id={self.id}, name={self.name})>'


class BlacklistedToken(db.Model):
    id = Column(Integer, primary_key=True)
    jti = Column(String(36), nullable=False, unique=True)
    created_at = Column(DateTime, nullable=False, default=func.now())
    def __repr__(self):
        return f'<BlacklistedToken (id={self.id}, jti={self.jti}, created_at={self.created_at})>'
    
class UserActionLog(db.Model, SerializerMixin):
    __tablename__ = 'user_action_log'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    action_type = Column(String(50))  # CREATE, UPDATE, DELETE
    target_model = Column(String(50))  # Business, User, etc.
    target_id = Column(String(50))
    details = Column(Text)
    timestamp = Column(DateTime, default=func.now())
    
    user = relationship('User', backref='action_logs')
    
    def __repr__(self):
        return f'<UserActionLog (user_id={self.user_id}, action={self.action_type}, target={self.target_model})>'


