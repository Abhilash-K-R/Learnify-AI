from transformers import pipeline

# Load model
generator = pipeline("text-generation", model="gpt2")

print("Chatbot is ready! Type 'stop' to exit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() == "stop":
        print("Chatbot stopped.")
        break

    response = generator(user_input, max_new_tokens=100, num_return_sequences=1)
    print("AI:", response[0]['generated_text'].replace(user_input, "").strip())
