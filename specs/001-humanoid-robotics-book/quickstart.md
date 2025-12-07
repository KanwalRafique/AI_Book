# Quickstart: Humanoid-Robotics-Book

**Date**: 2025-12-07
**Feature**: [Humanoid-Robotics-Book](./spec.md)

This document provides instructions on how to generate the book chapters, build the Docusaurus site, and view the content.

## Prerequisites

-   Node.js and npm/yarn installed (for Docusaurus).
-   Python 3.11+ installed (for content generation scripts, if any).
-   Familiarity with Git and Markdown.

## 1. Content Generation

The book chapters and supplementary sections will be generated as Markdown files within the `content/` directory, organized by module.

To generate content, follow the tasks outlined in `specs/001-humanoid-robotics-book/tasks.md` (to be created in Phase 2). These tasks will guide the process of generating each chapter's text, examples, and activities.

## 2. Docusaurus Setup

1.  **Ensure Docusaurus Project Exists**: This project assumes an existing Docusaurus setup at the root of the repository. If not, create one:
    ```bash
    npx create-docusaurus@latest my-website classic
    # Then copy the contents of my-website to your repo root.
    ```
2.  **Copy Generated Content**: After content generation, copy the Markdown files from their respective `content/` subdirectories into your Docusaurus project's `docs/` directory. For example, `content/ros2-humanoids/` chapters would go into `docs/ros2-humanoids/`.
3.  **Update Sidebar Navigation**: Edit the `sidebars.js` file in your Docusaurus project to include the newly added modules and chapters. Ensure the order reflects the intended learning progression.
4.  **Start the Docusaurus Development Server**:
    ```bash
    npm run start
    ```
5.  **Open your browser** to `http://localhost:3000` to view the book.

## 3. Content Review and Validation

-   **Markdown Syntax**: Review the generated Markdown files to ensure proper formatting and syntax.
-   **Docusaurus Build**: Run `npm run build` in your Docusaurus project to verify that the static site builds without errors.
-   **Content Accuracy**: Manually review all chapters for technical accuracy, clarity, and adherence to the specified word counts and chapter structure.
