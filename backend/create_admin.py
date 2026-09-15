"""
Resets the password for a user by PARTIAL email match.
This bypasses any hidden Unicode characters in the stored email.
"""
from main import app, db, User
from werkzeug.security import generate_password_hash

# ==========================================
# EDIT THESE TWO LINES
# ==========================================
PARTIAL_MATCH = "accentcoach"        # unique string from your email
NEW_PASSWORD = "AliAdmin2026!"        # ← change to whatever you want
# ==========================================

def reset_password():
    with app.app_context():
        print(f"🔍 Searching for users whose email contains: '{PARTIAL_MATCH}'")
        print()
        
        all_users = User.query.all()
        matches = [u for u in all_users if PARTIAL_MATCH.lower() in u.email.lower()]
        
        if not matches:
            print(f"❌ No users found containing '{PARTIAL_MATCH}'")
            print("   Here's what's in the DB:")
            for u in all_users:
                print(f"   → {u.email}")
            return
        
        if len(matches) > 1:
            print(f"⚠️  Multiple matches found:")
            for m in matches:
                print(f"   → {m.email}")
            print("   Using the first one...")
        
        target = matches[0]
        
        # Diagnostic: show the hex codes
        print(f"📧 Target email: {target.email}")
        print(f"📧 Length: {len(target.email)}")
        print(f"📧 Hex codes: {' '.join(f'{ord(c):02x}' for c in target.email)}")
        print()
        
        # Reset password
        target.password_hash = generate_password_hash(NEW_PASSWORD, method='pbkdf2:sha256')
        target.is_admin = True
        target.is_active = True
        db.session.commit()
        
        print(f"✅ Password reset for: {target.email}")
        print(f"✅ Admin flag set to True")
        print(f"\n🎉 You can now log in with:")
        print(f"   Email: {target.email}  (copy-paste this exactly)")
        print(f"   Password: {NEW_PASSWORD}")

if __name__ == '__main__':
    reset_password()