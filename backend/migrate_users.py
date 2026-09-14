"""
One-time migration script: moves users from clients.json into PostgreSQL.
Run this ONCE from the backend folder:
    python migrate_users.py
"""
import json
import os
from main import app, db, User
from werkzeug.security import generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENTS_FILE = os.path.join(BASE_DIR, 'clients.json')

def migrate():
    if not os.path.exists(CLIENTS_FILE):
        print("❌ clients.json not found. Nothing to migrate.")
        return

    with open(CLIENTS_FILE, 'r') as f:
        clients = json.load(f)

    if not clients:
        print("ℹ️ clients.json is empty. Nothing to migrate.")
        return

    with app.app_context():
        migrated = 0
        skipped = 0

        for client in clients:
            email = client.get('email', '').strip().lower()
            if not email:
                skipped += 1
                continue

            existing = User.query.filter_by(email=email).first()
            if existing:
                print(f"⏭️  Skipped (already exists): {email}")
                skipped += 1
                continue

            plain_password = client.get('password', '')
            new_user = User(
                id=client.get('id'),
                email=email,
                password_hash=generate_password_hash(plain_password, method='pbkdf2:sha256'),
                is_active=client.get('is_active', True),
                is_admin=False
            )
            db.session.add(new_user)
            migrated += 1
            print(f"✅ Migrated: {email}")

        db.session.commit()
        print(f"\n🎉 Migration complete! Migrated: {migrated}, Skipped: {skipped}")

if __name__ == '__main__':
    migrate()