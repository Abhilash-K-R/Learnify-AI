from transformers import pipeline

# Load summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def generate_structured_notes(text):
    # Break long docs into chunks
    chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
    summaries = [summarizer(chunk, max_length=150, min_length=50, do_sample=False)[0]['summary_text'] for chunk in chunks]
    
    # Format as structured notes
    structured_notes = "📘 **AI Generated Study Notes**\n\n"
    for i, s in enumerate(summaries, start=1):
        structured_notes += f"### Section {i}\n"
        # Split into sentences → bullets
        for sentence in s.split(". "):
            if sentence.strip():
                structured_notes += f"- {sentence.strip()}\n"
        structured_notes += "\n"
    return structured_notes

