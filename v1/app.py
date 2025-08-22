import streamlit as st
from modules.pdf_reader import extract_text_from_pdf
from modules.summarizer import generate_structured_notes
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io

st.title("📘 AI Study Buddy - PDF Notes Cleaner")

uploaded_file = st.file_uploader("Upload your PDF notes", type=["pdf"])

# Add a button so the user explicitly triggers processing
if uploaded_file is not None:
    if st.button("Generate Notes"):
        # Step 1: Extract text
        raw_text = extract_text_from_pdf(uploaded_file)
        
        # Step 2: Summarize & clean
        structured_notes = generate_structured_notes(raw_text)
        
        # Show on screen
        st.subheader("📝 Structured Notes")
        st.text_area("AI Notes", structured_notes, height=400)
        
        # Step 3: Create downloadable PDF
        pdf_buffer = None
        if structured_notes:
            pdf_buffer = create_pdf(structured_notes)

            st.download_button(
                label="📥 Download Notes as PDF",
                data=pdf_buffer,
                file_name="AI_Structured_Notes.pdf",
                mime="application/pdf"
            )


def create_pdf(text):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    y = height - 50

    for line in text.split("\n"):
        if line.startswith("###"):  # Section heading
            c.setFont("Helvetica-Bold", 12)
            c.drawString(40, y, line.replace("###", "").strip())
            y -= 20
        elif line.startswith("-"):  # Bullet points
            c.setFont("Helvetica", 10)
            c.drawString(60, y, "• " + line.replace("-", "").strip())
            y -= 15
        elif line.startswith("📘"):  # Title
            c.setFont("Helvetica-Bold", 14)
            c.drawString(40, y, line.replace("📘", "").strip())
            y -= 25
        else:
            c.setFont("Helvetica", 10)
            c.drawString(40, y, line.strip())
            y -= 15

        if y < 50:
            c.showPage()
            y = height - 50

    c.save()
    buffer.seek(0)
    return buffer
