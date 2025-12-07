# Quickstart: AI-Robot Brain with NVIDIA Isaac™

**Date**: 2025-12-07
**Feature**: [AI-Robot Brain with NVIDIA Isaac™](./spec.md)

This document provides instructions on how to generate the book chapters, view them using Docusaurus, and interact with the RAG service.

## Prerequisites

-   Node.js and npm/yarn installed.
-   Python 3.11+ installed.
-   Docker installed (for running Qdrant and Postgres).

## 1. Content Generation

The book chapters will be generated as Markdown files in the `content/nvidia-isaac-book/` directory.

To generate the content, the agent will execute the plan outlined in `tasks.md`.

## 2. Docusaurus Setup

1.  **Navigate to the Docusaurus project directory** (assuming one is set up).
2.  **Copy the generated content** from `content/nvidia-isaac-book/` to the `docs` directory of your Docusaurus project.
3.  **Start the Docusaurus development server**:
    ```bash
    npm run start
    ```
4.  **Open your browser** to `http://localhost:3000` to view the book.

## 3. RAG Service

### Backend Setup

1.  **Navigate to the `backend` directory**.
2.  **Install Python dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Start the backend service**:
    ```bash
    uvicorn main:app --reload
    ```

### Ingesting Content

1.  Run the ingestion script to process the Markdown files and load them into Qdrant and Neon Postgres:
    ```bash
    python -m rag.ingest
    ```

### Querying the RAG Service

1.  Send a POST request to the `/query` endpoint of the FastAPI service with a JSON payload like:
    ```json
    {
      "query": "What is NVIDIA Isaac Sim?"
    }
    ```
