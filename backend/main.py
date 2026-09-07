from flask import Flask, request, jsonify, send_from_directory, session, render_template_string
from flask_cors import CORS
import json
import os
import uuid
import hashlib
import secrets
import subprocess
import sys
from datetime import datetime, timedelta
from functools import wraps

# Root directory setup for Render
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, 
            static_folder=os.path.join(BASE_DIR, '../frontend'),
            template_folder=os.path.join(BASE_DIR, '../frontend'))
app.secret_key = secrets.token_hex(32)
CORS(app)

# File paths
CLIENTS_FILE = os.path.join(BASE_DIR, 'clients.json')
SAT_ENGINE_PATH = os.path.join(BASE_DIR, 'sat_engine')

# Ensure clients.json exists
if not os.path.exists(CLIENTS_FILE):
    with open(CLIENTS_FILE, 'w') as f:
        json.dump([], f)

# Helper functions
def load_clients():
    with open(CLIENTS_FILE, 'r') as f:
        return json.load(f)

def save_clients(clients):
    with open(CLIENTS_FILE, 'w') as f:
        json.dump(clients, f, indent=2)

def hash_password(password):
    salt = secrets.token_hex(16)
    hashed = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}:{hashed}"

def verify_password(password, stored_hash):
    salt, hashed = stored_hash.split(':')
    return hashlib.sha256((password + salt).encode()).hexdigest() == hashed

def generate_password():
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    return ''.join(secrets.choice(alphabet) for _ in range(12))

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Please login first'}), 401
        return f(*args, **kwargs)
    return decorated_function

# ---------- AUTH ROUTES ----------
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email', '').strip().lower()
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    clients = load_clients()
    
    if any(c['email'] == email for c in clients):
        return jsonify({'error': 'Email already registered'}), 400
    
    password = generate_password()
    hashed_password = password
    
    client = {
        'id': str(uuid.uuid4()),
        'email': email,
        'password': hashed_password,
        'created_at': datetime.now().isoformat(),
        'last_login': None,
        'is_active': True
    }
    
    clients.append(client)
    save_clients(clients)
    
    return jsonify({
        'success': True,
        'message': 'Account created successfully',
        'email': email,
        'password': password
    })

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    
    clients = load_clients()
    user = next((c for c in clients if c['email'] == email), None)
    
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    if user['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    user['last_login'] = datetime.now().isoformat()
    save_clients(clients)
    
    session['user_id'] = user['id']
    session['email'] = user['email']
    
    return jsonify({
        'success': True,
        'message': 'Login successful',
        'user': {
            'id': user['id'],
            'email': user['email']
        }
    })

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out'})

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        clients = load_clients()
        user = next((c for c in clients if c['id'] == session['user_id']), None)
        if user:
            return jsonify({
                'authenticated': True,
                'user': {
                    'id': user['id'],
                    'email': user['email']
                }
            })
    return jsonify({'authenticated': False})

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email', '').strip().lower()
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    clients = load_clients()
    user = next((c for c in clients if c['email'] == email), None)
    
    if not user:
        return jsonify({'error': 'Email not found'}), 404
    
    new_password = generate_password()
    user['password'] = new_password
    save_clients(clients)
    
    return jsonify({
        'success': True,
        'message': 'New password generated',
        'email': email,
        'new_password': new_password
    })

# ---------- SERVICE ROUTES ----------
@app.route('/')
def serve_homepage():
    return send_from_directory(os.path.join(BASE_DIR, '../frontend'), 'index.html')

@app.route('/contact')
def contact():
    return send_from_directory(os.path.join(BASE_DIR, '../frontend'), 'Contact-Us.html')

@app.route('/services/<path:filename>')
def serve_service(filename):
    return send_from_directory(os.path.join(BASE_DIR, '../frontend/services'), filename)

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(os.path.join(BASE_DIR, '../frontend'), path)

# ---------- SERVICES API ----------
@app.route('/api/services', methods=['GET'])
def get_services():
    services = [
        {
            'id': 'sat',
            'name': 'SAT Adaptive Exam',
            'icon': '📘',
            'description': 'Full-length Digital SAT with adaptive scoring',
            'requires_auth': False,
            'path': '/services/sat/sat_hub.html'
        },
        {
            'id': 'sat_exam_2',
            'name': 'SAT Practice Test 2',
            'icon': '📚',
            'description': 'Second original SAT practice exam with advanced reading and writing questions.',
            'requires_auth': False,
            'path': '/services/sat/sat_exam2.html'
        },
        {
            'id': 'ielts_exam1',
            'name': 'IELTS Exam 1',
            'icon': '🎓',
            'description': 'Complete IELTS Test 1 - Listening, Reading, Writing',
            'requires_auth': False,
            'path': '/services/ielts/exam1/ielts_listening_test.html'
        },
        {
            'id': 'ielts_exam2',
            'name': 'IELTS Exam 2',
            'icon': '🎓',
            'description': 'Complete IELTS Test 2 - Listening, Reading, Writing',
            'requires_auth': False,
            'path': '/services/ielts/exam2/IELTS_LISTENING_test2.html'
        },
        {
            'id': 'speaking',
            'name': 'IELTS Speaking Practice',
            'icon': '🎤',
            'description': 'Practice IELTS speaking with sample questions and tips',
            'requires_auth': False,
            'path': '/services/ielts/IELTS_SPEAKING_PRACTICE.html'
        },
        {
            'id': 'accent',
            'name': 'American Accent Guide',
            'icon': '🇺🇸',
            'description': 'Master American English pronunciation and accent',
            'requires_auth': False,
            'path': '/services/PRACTICE_GUIDE_FOR_AMERICAN_ACCENT_COURSE.html'
        },
        {
            'id': 'speaker',
            'name': 'Secrets of International Speaker',
            'icon': '🎙️',
            'description': 'Professional public speaking and presentation skills',
            'requires_auth': False,
            'path': '/services/international_speaker_secrets.html'
        }
    ]
    return jsonify(services)

# ---------- HEALTH CHECK ----------
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'services': ['auth', 'sat', 'ielts', 'accent', 'speaker']
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
