# Research: Docusaurus Markdown Format

**Date**: 2025-12-07
**Feature**: [Create Humanoid Robotics Book with ROS 2](./spec.md)

## Objective

To understand the specific Markdown format and features supported by Docusaurus to ensure the generated book chapters are fully compatible.

## Findings

Docusaurus uses a superset of Markdown called MDX (Markdown + JSX), which allows for rich content features. For the purpose of this content generation task, the following are the key considerations:

### 1. Standard Markdown

All standard Markdown syntax is supported. This includes:

-   Headings (H1, H2, H3, etc.)
-   Text formatting (bold, italic, strikethrough)
-   Lists (ordered and unordered)
-   Links
-   Images
-   Tables
-   Code blocks (with syntax highlighting)

### 2. Frontmatter

Each Markdown file should start with a YAML frontmatter block to provide metadata.

**Example:**
```yaml
---
title: My Chapter Title
slug: /my-chapter-slug
---
```

-   `title`: The title of the chapter that will be displayed.
-   `slug`: The URL slug for the chapter.

### 3. Docusaurus-Specific Features

Docusaurus provides custom syntax for more advanced components:

-   **Admonitions**: For callouts like tips, notes, and warnings.
    ```markdown
    :::note
    This is a note.
    :::

    :::tip
    This is a tip.
    :::

    :::important
    This is important.
    :::

    :::caution
    This is a caution.
    :::

    :::warning
    This is a warning.
    :::
    ```

-   **Code Blocks**: Can include line highlighting and line numbers.

    ```markdown
    ```python title="My Python Code" {1,4-6}
    def my_function():
        # This is my function
        # It does things
        # Line 4
        # Line 5
        # Line 6
        pass
    ```

### 4. Images and Assets

Images can be included using standard Markdown syntax. Assets should be co-located with the Markdown files.

## Conclusion

For the content generation, we will:
1.  Use standard Markdown for the main body of the content.
2.  Include a frontmatter block at the top of each chapter file with `title` and `slug`.
3.  Use admonitions to highlight key points, definitions, or warnings.
4.  Use fenced code blocks with language specifiers for all code examples.
