"""
Fixes the admin email to Ali's real email and resets the password.
"""
from main import app, db, User
from werkzeug.security import generate_password_hash

# ==========================================
# CORRECT VALUES
# ==========================================
CORRECT_EMAIL = "aboulila.accentcoach@gmail.com"   # single L, then i-l-a
NEW_PASSWORD = "AliAdmin2026!"                     # change if you want
# ==========================================

def fix():
    with app.app_context():
        # Find the user with 'accentcoach' (bypassing the L/L typo)
        target = User.query.filter(User.email.like('%accentcoach%')).first()
        
        if not target:
            print("❌ No user with 'accentcoach' found.")
            return
        
        print(f"✅ Found user with old email: {target.email}")
        print(f"   Old length: {len(target.email)}")
        
        # Rewrite email to the CORRECT spelling
        target.email = CORRECT_EMAIL
        target.password_hash = generate_password_hash(NEW_PASSWORD, method='pbkdf2:sha256')
        target.is_admin = True
        target.is_active = True
        
        db.session.commit()
        
        print()
        print(f"✅ Email changed to: {target.email}")
        print(f"✅ Password reset.")
        print(f"✅ Admin flag set.")
        print()
        print("🎉 LOGIN WITH THESE EXACT CREDENTIALS:")
        print(f"   Email:    {CORRECT_EMAIL}")
        print(f"   Password: {NEW_PASSWORD}")

if __name__ == '__main__':
    fix()