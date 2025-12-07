# Data Model: Vision-Language-Action (VLA)

**Date**: 2025-12-07
**Feature**: [Vision-Language-Action (VLA)](./spec.md)

## Entities

This feature involves several data models: the `Chapter` for the book's content, the data model for the RAG (Retrieval-Augmented Generation) system, and specific data structures for the voice-to-action pipeline.

### 1. Chapter

A self-contained unit of educational content.

**Attributes**:
-   `title` (string): The title of the chapter.
-   `slug` (string): The URL-friendly identifier for the chapter.
-   `content` (string): The body of the chapter in Markdown format.
-   `word_count` (integer): The number of words in the chapter.
-   `objectives` (list of strings): The learning objectives for the chapter.
-   `example` (string): A code example or conceptual illustration.
-   `student_activity` (string): A prompt for a student activity.
-   `summary` (string): A summary of the chapter.

This data model is conceptual and will be realized as a collection of Markdown files with a specific structure and frontmatter.

### 2. RAG System

The RAG system will have its own data model for storing and retrieving content.

-   **Document**: Represents a chapter or a section of a chapter.
    -   `doc_id` (string): A unique identifier for the document.
    -   `source` (string): The file path or URL of the source document.
    -   `metadata` (JSON): Additional metadata, such as chapter title, section, etc. (Stored in Neon Postgres).
-   **Chunk**: A smaller segment of a document.
    -   `chunk_id` (string): A unique identifier for the chunk.
    -   `doc_id` (string): The ID of the document this chunk belongs to.
    -   `text` (string): The text content of the chunk.
    -   `embedding` (vector): The vector embedding of the chunk's text. (Stored in Qdrant).

### 3. Voice-to-Action Pipeline

The voice-to-action pipeline involves several data structures for processing voice commands.

-   **VoiceCommand**: Represents a transcribed voice command.
    -   `text` (string): The transcribed text of the voice command.
    -   `timestamp` (datetime): The time the command was received.
    -   `language` (string): The detected language of the command.
-   **RobotAction**: Represents a high-level action to be performed by the robot.
    -   `action_type` (string): e.g., "move", "grasp", "speak".
    -   `parameters` (JSON): Parameters for the action, e.g., `{"direction": "forward", "distance": 1.0}`.
-   **ROS2ActionMessage**: A specific ROS 2 message format for a robot action.
    -   `msg_type` (string): The ROS 2 message type.
    -   `data` (JSON): The message payload.
    -   `topic` (string): The ROS 2 topic to publish to.
