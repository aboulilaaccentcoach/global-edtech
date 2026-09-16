"""
Migration script: Adds the new expiry fields to the users table.
Safe to run multiple times — it checks if columns already exist before adding them.
"""
import os
from sqlalchemy import text
from main import app, db

# New columns to add
NEW_COLUMNS = [
    ("password_expires_at", "TIMESTAMP WITH TIME ZONE"),
    ("access_expires_at", "TIMESTAMP WITH TIME ZONE"),
    ("subscription_tier", "VARCHAR(50) DEFAULT 'free'"),
    ("notes", "TEXT"),
]

def column_exists(conn, table_name, column_name):
    """Check if a column exists in a table."""
    result = conn.execute(text("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = :table AND column_name = :column
    """), {"table": table_name, "column": column_name})
    return result.fetchone() is not None

def migrate():
    with app.app_context():
        with db.engine.connect() as conn:
            print("=" * 60)
            print("🔧 Migrating users table — adding expiry fields")
            print("=" * 60)
            
            added = 0
            skipped = 0
            
            for col_name, col_type in NEW_COLUMNS:
                if column_exists(conn, "users", col_name):
                    print(f"⏭️  Skipped (already exists): users.{col_name}")
                    skipped += 1
                else:
                    try:
                        sql = f'ALTER TABLE users ADD COLUMN {col_name} {col_type}'
                        conn.execute(text(sql))
                        conn.commit()
                        print(f"✅ Added: users.{col_name} ({col_type})")
                        added += 1
                    except Exception as e:
                        print(f"❌ Failed to add {col_name}: {e}")
            
            print()
            print("=" * 60)
            print(f"🎉 Migration complete! Added: {added}, Skipped: {skipped}")
            print("=" * 60)

if __name__ == '__main__':
    migrate()