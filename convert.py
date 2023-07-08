import os
import io
import pyvips
from PIL import Image, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from concurrent.futures import ProcessPoolExecutor
import logging

logging.basicConfig(level=logging.INFO)

def invert_pdf_colors(pdf_path):
    logging.info(f'Processing {pdf_path}')
    inverted_pdf_path = 'inverted_' + os.path.basename(pdf_path)

    # Convert PDF to PNG
    logging.info(f'Converting {pdf_path} to PNG')
    image = pyvips.Image.new_from_file(pdf_path, access='sequential')
    memory_file = io.BytesIO()
    image.write_to_memory(memory_file)

    # Invert PNG colors
    logging.info(f'Inverting colors of image')
    img = Image.open(memory_file)
    inverted_img = ImageOps.invert(img)

    # Convert PNG back to PDF
    logging.info(f'Converting image back to PDF')
    c = canvas.Canvas(inverted_pdf_path, pagesize=letter)
    c.drawImage(inverted_img, 0, 0, width=letter[0], height=letter[1])
    c.showPage()
    c.save()

    logging.info(f'Saved inverted PDF as {inverted_pdf_path}')

def invert_colors_in_multiple_pdfs(pdf_paths):
    with ProcessPoolExecutor() as executor:
        executor.map(invert_pdf_colors, pdf_paths)

pdf_paths = ['input1.pdf']  # Replace these with your actual PDF paths
invert_colors_in_multiple_pdfs(pdf_paths)
