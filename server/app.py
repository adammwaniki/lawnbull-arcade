# Library imports
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


# Local imports
from config import (app, api, jwt, Resource)
from models import User, Business

@app.route('/business')
def get_all_businesses():
    return ''


@app.route('/business/<int:id>')
def get_business_by_id(id):
    return ''

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password, data['password']):
            access_token = jwt.create_access_token(
                identity=user.id,
                additional_claims={
                    'isAdmin': user.admin,
                    'email': user.email,
                    'username': user.username,
                },
                expires_delta=jwt.timedelta(hours=1)  # Token expiration time
            )
            return {
                "message": "Login successful",
                "access_token": access_token,
                "user": {
                    "public_id": user.public_id,
                    "email": user.email,
                    "username": user.username,
                }
            }, 200
        return {"message": "Invalid credentials"}, 401

api.add_resource(Login, '/login', endpoint='login')




if __name__ == '__main__':
    app.run(debug=True)
