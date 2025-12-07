# Quickstart: Humanoid Robotics Book

**Date**: 2025-12-07
**Feature**: [Create Humanoid Robotics Book with ROS 2](./spec.md)

This document provides instructions on how to generate the book chapters and view them using Docusaurus.

## Prerequisites

-   Node.js and npm/yarn installed.
-   A Docusaurus project set up.

## 1. Content Generation

The book chapters will be generated as Markdown files in the `content/humanoid-robotics-book/` directory. Each file will represent a chapter and will be formatted for Docusaurus.

To generate the content, the agent will execute the plan outlined in `tasks.md` (to be created in Phase 2).

## 2. Docusaurus Setup

If you don't have a Docusaurus project, you can create one with the following command:

```bash
npx create-docusaurus@latest my-website classic
```

## 3. Viewing the Content

1.  **Copy the generated content** from `content/humanoid-robotics-book/` to the `blog` or `docs` directory of your Docusaurus project.
2.  **Start the Docusaurus development server**:
    ```bash
    cd my-website
    npm run start
    ```
3.  **Open your browser** to `http://localhost:3000` to view the book.
