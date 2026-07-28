# Book PDF & Image Store Directory

This folder is created for storing all **Book PDFs** and **Book Cover / Preview Images** for Manish Vaghasiya's platform.

## Directory Structure

```text
frontend/public/books/
├── pdf/
│   └── Student_Confidence_Master_Guide_Manish_Vaghasiya.pdf  <-- Put your official Book PDF here (or book.pdf)
└── images/
    ├── cover.jpg      <-- Main Book Cover Image
    ├── mockup.png     <-- 3D Book Mockup Display Image
    ├── preview-1.jpg  <-- Book Chapter/Inside Preview 1
    └── preview-2.jpg  <-- Book Chapter/Inside Preview 2
```

## Public URL Paths

Any file placed inside `frontend/public/books/` becomes accessible at the following public web paths:

- **PDF Download Path**: `/books/pdf/Student_Confidence_Master_Guide_Manish_Vaghasiya.pdf` (or `/books/pdf/book.pdf`)
- **Book Cover Image**: `/books/images/cover.jpg`
- **Book 3D Mockup**: `/books/images/mockup.png`

## Quick Instructions for Adding Files:

1. Copy your final **Book PDF file** into `frontend/public/books/pdf/`.
2. Copy your **Book Cover & Preview Images** into `frontend/public/books/images/`.
3. Supported image formats: `.jpg`, `.png`, `.webp`, `.svg`.
4. Supported document format: `.pdf`.
