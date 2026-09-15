"""
Diagnostic script: tests the login flow directly against the database.
"""
from main import app, db, User
from werkzeug.security import check_password_hash

# ==========================================
TARGET_EMAIL = "aboullia.accentcoach@gmail.com"
TARGET_PASSWORD = "AliAdmin2026!"
# ==========================================

def debug():
    with app.app_context():
        print("=" * 60)
        print("🔍 WHAT THE SCRIPT IS SEARCHING FOR:")
        print(f"   Email: '{TARGET_EMAIL}'")
        print(f"   Length: {len(TARGET_EMAIL)}")
        print(f"   Hex: {' '.join(f'{ord(c):02x}' for c in TARGET_EMAIL)}")
        print("=" * 60)
        print()
        
        # Step 1: Try the exact same query the server runs
        user = User.query.filter_by(email=TARGET_EMAIL).first()
        
        if not user:
            print("❌ EXACT MATCH FAILED.")
            print()
            print("📋 Here is what's actually in the database:")
            all_users = User.query.all()
            for u in all_users:
                print(f"   → Email: '{u.email}'")
                print(f"     Length: {len(u.email)}")
                print(f"     Hex: {' '.join(f'{ord(c):02x}' for c in u.email)}")
                print(f"     Active: {u.is_active}")
                print(f"     Hash prefix: {u.password_hash[:25]}...")
                print()
            return
        
        # Step 2: User was found. Now test the password.
        print(f"✅ USER FOUND in database!")
        print(f"   DB Email: '{user.email}'")
        print(f"   DB Email Length: {len(user.email)}")
        print(f"   DB Email Hex: {' '.join(f'{ord(c):02x}' for c in user.email)}")
        print(f"   Is Active: {user.is_active}")
        print(f"   Is Admin: {user.is_admin}")
        print(f"   Hash Prefix: {user.password_hash[:30]}...")
        print()
        
        # Step 3: Test password
        print("=" * 60)
        print(f"🔐 TESTING PASSWORD: '{TARGET_PASSWORD}'")
        print(f"   Password Length: {len(TARGET_PASSWORD)}")
        print(f"   Password Hex: {' '.join(f'{ord(c):02x}' for c in TARGET_PASSWORD)}")
        print("=" * 60)
        
        is_valid = check_password_hash(user.password_hash, TARGET_PASSWORD)
        print(f"   ✅ Password valid: {is_valid}")
        
        if not is_valid:
            print()
            print("💡 PASSWORD MISMATCH!")
            print("   This means the hash in the database doesn't match what we're testing.")
            print("   Possible causes:")
            print("   1. The reset script didn't save correctly")
            print("   2. There's a hidden character in the password")
            print("   3. The hash uses a different algorithm")

if __name__ == '__main__':
    debug()