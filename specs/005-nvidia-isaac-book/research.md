# Research: AI-Robot Brain with NVIDIA Isaac™

**Date**: 2025-12-07
**Feature**: [AI-Robot Brain with NVIDIA Isaac™](./spec.md)

## Objective

To document the technology choices and architectural decisions for the "AI-Robot Brain with NVIDIA Isaac™" book and the accompanying RAG system.

## Findings

The implementation plan is based on a pre-defined technical architecture specified in the user prompt.

### 1. Content Generation and Formatting

-   **Platform**: Docusaurus will be used for creating the documentation website.
-   **Format**: Content will be written in Markdown.

### 2. Backend RAG Service

-   **Framework**: FastAPI will be used to build the backend service.
-   **Vector Database**: Qdrant is selected for storing and searching vector embeddings.
-   **Relational Database**: Neon Postgres is chosen for storing metadata and any other structured data.
-   **Pipeline**: The RAG (Retrieval-Augmented Generation) pipeline will be implemented to provide a question-answering functionality based on the book's content.

## Conclusion

The technology stack is well-defined. The next steps are to implement the content generation workflow and the RAG service according to the specified architecture.
