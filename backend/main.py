from flask import Flask, request, jsonify, send_from_directory, session, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime
import os
import uuid
import secrets

# ============================================================
# APP & DATABASE SETUP
# ============================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__,
            static_folder=os.path.join(BASE_DIR, '../frontend'),
            template_folder=os.path.join(BASE_DIR, '../frontend'))

# SECRET KEY: Fixed via environment variable (prevents logout on restart)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-change-me-in-production')

# DATABASE: PostgreSQL in production, SQLite fallback locally
database_url = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(BASE_DIR, 'local.db'))
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

CORS(app, supports_credentials=True)

db = SQLAlchemy(app)


# ============================================================
# DATABASE MODELS
# ============================================================
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }


# Create all tables on first run
with app.app_context():
    db.create_all()
    print("✅ Database tables verified/created.")


# ============================================================
# HELPERS
# ============================================================
def generate_password():
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    return ''.join(secrets.choice(alphabet) for _ in range(12))


def login_required(f):
    """Protects API routes - returns 401 JSON if not logged in."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Please login first', 'redirect': '/'}), 401
        return f(*args, **kwargs)
    return decorated_function


def page_login_required(f):
    """Protects HTML pages - redirects to homepage if not logged in."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect('/?login_required=1')
        return f(*args, **kwargs)
    return decorated_function


# ============================================================
# AUTH ROUTES
# ============================================================
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({'error': 'Email already registered'}), 400

    plain_password = generate_password()
    new_user = User(
        email=email,
        password_hash=generate_password_hash(plain_password, method='pbkdf2:sha256')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Account created successfully',
        'email': email,
        'password': plain_password
    })


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    if not user.is_active:
        return jsonify({'error': 'Account is disabled'}), 403

    user.last_login = datetime.utcnow()
    db.session.commit()

    session['user_id'] = user.id
    session['email'] = user.email

    return jsonify({
        'success': True,
        'message': 'Login successful',
        'user': {'id': user.id, 'email': user.email}
    })


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out'})


@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user and user.is_active:
            return jsonify({'authenticated': True, 'user': {'id': user.id, 'email': user.email}})
    return jsonify({'authenticated': False})


@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Email not found'}), 404

    new_password = generate_password()
    user.password_hash = generate_password_hash(new_password, method='pbkdf2:sha256')
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'New password generated',
        'email': email,
        'new_password': new_password
    })


# ============================================================
# PAGE ROUTES
# ============================================================
@app.route('/')
def serve_homepage():
    return send_from_directory(os.path.join(BASE_DIR, '../frontend'), 'index.html')


@app.route('/contact')
def contact():
    return send_from_directory(os.path.join(BASE_DIR, '../frontend'), 'Contact-Us.html')


# 🔒 PROTECTED: Only logged-in users can access course/service pages
@app.route('/services/<path:filename>')
@page_login_required
def serve_service(filename):
    return send_from_directory(os.path.join(BASE_DIR, '../frontend/services'), filename)


@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(os.path.join(BASE_DIR, '../frontend'), path)


# ============================================================
# SERVICES API
# ============================================================
@app.route('/api/services', methods=['GET'])
def get_services():
    services = [
        {'id': 'sat', 'name': 'SAT Adaptive 4 Exams', 'icon': '📘',
         'path': '/services/sat/sat_hub.html'},
        {'id': 'ielts_exam1', 'name': 'IELTS Exam 1', 'icon': '🎓',
         'path': '/services/ielts/exam1/ielts_listening_test.html'},
        {'id': 'ielts_exam2', 'name': 'IELTS Exam 2', 'icon': '🎓',
         'path': '/services/ielts/exam2/IELTS_LISTENING_test2.html'},
        {'id': 'speaking', 'name': 'IELTS Speaking Practice', 'icon': '🎤',
         'path': '/services/ielts/IELTS_SPEAKING_PRACTICE.html'},
        {'id': 'accent', 'name': 'American Accent Guide', 'icon': '🇺🇸',
         'path': '/services/PRACTICE_GUIDE_FOR_AMERICAN_ACCENT_COURSE.html'},
        {'id': 'speaker', 'name': 'Secrets of International Speaker', 'icon': '🎙️',
         'path': '/services/international_speaker_secrets.html'}
    ]
    return jsonify(services)


# ============================================================
# HEALTH CHECK
# ============================================================
@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        user_count = User.query.count()
        db_status = 'connected'
    except Exception as e:
        user_count = 0
        db_status = f'error: {str(e)}'

    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'database': db_status,
        'total_users': user_count
    })


# ============================================================
# ENTRY POINT
# ============================================================
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)