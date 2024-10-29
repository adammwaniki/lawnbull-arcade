# Library imports
import cloudinary
import cloudinary.uploader
from werkzeug.utils import secure_filename
from werkzeug.exceptions import UnprocessableEntity
import uuid
from flask import  request, jsonify
import logging
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, create_access_token, create_refresh_token

# Local imports
from config import (app, api, jwt, Resource, db, os)
from models import User, Business, BlacklistedToken

# Configure Cloudinary
cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

def upload_file(file):
    if file:
        filename = secure_filename(file.filename)
        upload_result = cloudinary.uploader.upload(file)
        return upload_result['secure_url']
    return None

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Lawnbull Arcade API'}), 200


@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), username=data['username'], password=hashed_password, email=data['email'], admin=False)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'}), 201

@app.route('/user/<public_id>', methods=['GET'])
@jwt_required()
def get_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 404
    user_data = user.to_dict()
    return jsonify({'user': user_data}), 200

@app.route('/user/<public_id>', methods=['PUT'])
@jwt_required()
def update_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 404
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    db.session.commit()
    return jsonify({'message': 'User has been updated!'}), 200

@app.route('/user/<public_id>', methods=['DELETE'])
@jwt_required()
def delete_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'The user has been deleted!'}), 200

@app.route('/business', methods=['POST'])
@jwt_required()
def create_business():
    try:
        data = request.form
        files = request.files

        # Create business directly without validation checks
        new_business = Business(
            name=data.get('name', ''),
            subtitle=data.get('subtitle', ''),
            paragraph1=data.get('paragraph1', ''),
            paragraph2=data.get('paragraph2', ''),
            paragraph3=data.get('paragraph3', ''),
            main_image_url=upload_file(files.get('mainImage')) or data.get('mainImageUrl', ''),
            additional_image_url1=upload_file(files.get('additionalImage1')) or data.get('additionalImage1Url', ''),
            additional_image_url2=upload_file(files.get('additionalImage2')) or data.get('additionalImage2Url', ''),
            additional_image_url3=upload_file(files.get('additionalImage3')) or data.get('additionalImage3Url', '')
        )

        db.session.add(new_business)
        db.session.commit()

        return jsonify({
            'message': 'Business created successfully!',
            'business_id': new_business.id
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/business/<int:id>', methods=['PUT'])
@jwt_required()
def update_business(id):
    business = Business.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(business, key, value)
    db.session.commit()
    return jsonify({'message': 'Business has been updated!'}), 200

@app.route('/business/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_business(id):
    business = Business.query.get_or_404(id)
    db.session.delete(business)
    db.session.commit()
    return jsonify({'message': 'The business has been deleted!'}), 200

@app.route('/businesses', methods=['GET'])
def get_all_businesses():
    businesses = Business.query.all()
    return jsonify([business.to_dict() for business in businesses]), 200

@app.route('/business/search')
def search_businesses():
    query = request.args.get('q')
    businesses = Business.query.filter(
        (Business.name.ilike(f'%{query}%')) |
        (Business.city.ilike(f'%{query}%')) |
        (Business.county.ilike(f'%{query}%'))
    ).all()
    return jsonify([business.to_dict() for business in businesses]), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), username=data['username'], password=hashed_password, email=data['email'], admin=False)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registration successful!'}), 201

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    blacklisted_token = BlacklistedToken(jti=jti)
    db.session.add(blacklisted_token)
    db.session.commit()
    return jsonify({'message': 'Successfully logged out'}), 200

@app.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_jwt_identity()
    claims = get_jwt()
    if not claims.get('isAdmin'):
        return jsonify({'message': 'Admin privilege required!'}), 403
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@app.route('/user/<public_id>/promote', methods=['PUT'])
@jwt_required()
def promote_user(public_id):
    current_user = get_jwt_identity()
    claims = get_jwt()
    if not claims.get('isAdmin'):
        return jsonify({'message': 'Admin privilege required!'}), 403
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 404
    user.admin = True
    db.session.commit()
    return jsonify({'message': 'The user has been promoted to admin!'}), 200



class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password, data['password']):
            access_token = create_access_token(
                identity=user.id,
                additional_claims={
                    'isAdmin': user.admin,
                    'email': user.email,
                    'username': user.username,
                }
            )
            refresh_token = create_refresh_token(identity=user.id)
            return {
                "message": "Login successful",
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": {
                    "public_id": user.public_id,
                    "email": user.email,
                    "username": user.username,
                }
            }, 200
        return {"message": "Invalid credentials"}, 401

api.add_resource(Login, '/login', endpoint='login')

class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return {'access_token': new_access_token}, 200

api.add_resource(TokenRefresh, '/token/refresh', endpoint='token_refresh')


if __name__ == '__main__':
    app.run()
