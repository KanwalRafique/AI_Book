# Data Model: Humanoid-Robotics-Book

**Date**: 2025-12-07
**Feature**: [Humanoid-Robotics-Book](./spec.md)

## Entities

This book project primarily deals with structured content, where each part of the book can be considered an entity.

### 1. Module

A major section of the book, representing a core topic area.

**Attributes**:
-   `name` (string): The title of the module (e.g., "Robotic Nervous System (ROS 2)").
-   `slug` (string): A URL-friendly identifier for the module.
-   `description` (string): A brief overview of the module's content.

### 2. Chapter

A subdivision within a module or an additional section, representing a specific learning unit.

**Attributes**:
-   `title` (string): The title of the chapter.
-   `slug` (string): A URL-friendly identifier for the chapter.
-   `content` (string): The body of the chapter in Markdown format.
-   `word_count` (integer): The estimated word count of the chapter.
-   `objectives` (list of strings): Learning objectives for the chapter.
-   `explanation` (string): The core instructional text.
-   `example` (string): Conceptual or pseudocode examples.
-   `student_activity` (string): Prompts for student engagement.
-   `summary` (string): A concise summary of the chapter's key points.
-   `module_slug` (string): Foreign key referencing the `slug` of the parent Module.

### 3. Supplementary Section

Additional content beyond core chapters, such as glossaries or FAQs.

**Attributes**:
-   `title` (string): Title of the section (e.g., "Glossary").
-   `slug` (string): A URL-friendly identifier for the section.
-   `content` (string): The Markdown content of the section.

### 4. Learning Plan Entry

An entry in the 13-week learning plan.

**Attributes**:
-   `week_number` (integer): The specific week number (1-13).
-   `topics_covered` (list of strings): Key topics for that week.
-   `associated_chapters` (list of strings): References to relevant chapter slugs.
-   `activities` (list of strings): Recommended student activities or mini-projects for the week.
