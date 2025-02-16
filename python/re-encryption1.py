import random

def encrypt_message(message, key):
    encrypted_message = ""
    for char in message:
        if char.isalpha():
            shift = key if char.islower() else key
            new_char = chr((ord(char) + shift - 97) % 26 + 97) if char.islower() else chr((ord(char) + shift - 65) % 26 + 65)
            encrypted_message += new_char
        else:
            encrypted_message += char
    return encrypted_message

def re_encrypt_message(encrypted_message, initial_key):
    # Generate a random new key
    new_key = random.randint(10,99) 
    
    # Directly re-encrypt the message 
    re_encrypted_message = encrypt_message(encrypted_message, new_key - initial_key) 
    
    return re_encrypted_message, new_key

# Prompt user for inputs
message = input("\nEnter the message: ")
initial_key = int(input("Enter the initial encryption key (number): "))

# Encrypt the message with the initial key
encrypted_message = encrypt_message(message, initial_key)
print(f"Encrypted message: {encrypted_message}")

# Re-encrypt the message with a randomly generated key
re_encrypted_message, new_key = re_encrypt_message(encrypted_message, initial_key)
print(f"Re-encrypted message: {re_encrypted_message}")
print(f"New encryption key: {new_key}")

# Decrypt the re-encrypted message to get the original text
decrypted_re_encrypted_message = encrypt_message(re_encrypted_message, -new_key) 
print(f"Original text after re-encryption: {decrypted_re_encrypted_message}")