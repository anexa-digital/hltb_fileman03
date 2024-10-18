import bcrypt
import json
import os

USER_FILE = 'users.json'

# Function to create or update a user
def create_or_update_user(username, password):
    # Generate a bcrypt salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    # Check if the file exists
    if os.path.exists(USER_FILE):
        # Load existing users
        with open(USER_FILE, 'r') as file:
            users = json.load(file)
    else:
        # Create an empty dictionary if the file doesn't exist
        users = {}

    # Update or add the user with the hashed password
    users[username] = {
        "username": username,
        "hashed_password": hashed_password
    }

    # Write updated users back to the file
    with open(USER_FILE, 'w') as file:
        json.dump(users, file, indent=4)
    
    print(f"Password for user '{username}' has been set/reset successfully.")

# Example usage
if __name__ == '__main__':
    username = input("Enter username (e.g., 'admin'): ")
    password = input("Enter new password: ")
    create_or_update_user(username, password)
