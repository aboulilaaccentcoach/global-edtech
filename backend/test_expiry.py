"""
Test script: Sets a user's access to expire in the past to test the block.
Run on a TEST account only, not your admin account.
"""
from main import app, db, User
from datetime import datetime, timedelta

# ⚠️ USE THE TEST ACCOUNT
TEST_EMAIL = "aboulila.accentcoach+test6@gmail.com"

def test_expiry():
    with app.app_context():
        user = User.query.filter_by(email=TEST_EMAIL).first()
        if not user:
            print(f"❌ User not found: {TEST_EMAIL}")
            return
        
        print("=" * 60)
        print(f"📧 User: {user.email}")
        print(f"   access_expires_at: {user.access_expires_at}")
        print(f"   password_expires_at: {user.password_expires_at}")
        print("=" * 60)
        
        # Save original
        original_access = user.access_expires_at
        
        # Force access to expire
        user.access_expires_at = datetime.utcnow() - timedelta(days=1)
        db.session.commit()
        print()
        print("🔴 Forced access to expire YESTERDAY")
        print()
        print("👉 NOW: Test the login in a browser with:")
        print(f"   Email: {TEST_EMAIL}")
        print(f"   Password: (the one from the email)")
        print()
        print("   Expected: 'Your subscription expired 1 days ago. Please renew to continue.'")
        print()
        
        # Wait for user to test
        input("Press Enter to RESTORE access and finish...")
        
        user.access_expires_at = original_access
        db.session.commit()
        print()
        print(f"✅ Access restored to: {user.access_expires_at}")

if __name__ == '__main__':
    test_expiry()