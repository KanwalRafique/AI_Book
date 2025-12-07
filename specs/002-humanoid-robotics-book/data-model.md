# Data Model: Humanoid Robotics Book

**Date**: 2025-12-07
**Feature**: [Create Humanoid Robotics Book with ROS 2](./spec.md)

## Entities

This feature is focused on content generation and does not have a traditional data model with persistent entities. The primary "entity" is the **Chapter**.

### Chapter

A self-contained unit of educational content.

**Attributes**:
-   `title` (string): The title of the chapter.
-   `slug` (string): The URL-friendly identifier for the chapter.
-   `content` (string): The body of the chapter in Markdown format.
-   `word_count` (integer): The number of words in the chapter.

**Relationships**:
-   A **Book** is composed of multiple **Chapters**.

This data model is conceptual and will be realized as a collection of Markdown files, where each file represents a chapter.
