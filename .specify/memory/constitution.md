<!-- Sync Impact Report:
Version change: None → 0.1.0
Modified principles: None
Added sections: Key Standards and Constraints, Success Criteria
Removed sections: PRINCIPLE_6
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated
- .specify/templates/spec-template.md: ✅ updated
- .specify/templates/tasks-template.md: ✅ updated
- .specify/templates/commands/sp.constitution.md: ⚠ pending (file not found)
- CLAUDE.md: ✅ updated
- README.md: ⚠ pending (file not found)
Follow-up TODOs: None
-->
# AI/Spec-Driven Book Creation Constitution

## Core Principles

### Accuracy
Every technical explanation must be precise and validated from reliable AI, robotics, and software-engineering sources.

### Clarity
Content must be understandable for Grade 8–12 students and beginner developers.

### Structure
The entire book must follow a consistent, modular, and Docusaurus-friendly layout.

### Reproducibility
All steps, examples, and code must be fully replicable by students.

### Clean AI Workflow
All writing must follow Spec-Kit Plus standards and remain AI-native (generated, refined, and structured with specs).

## Key Standards and Constraints

**Key Standards:**
- All definitions, facts, and diagrams must be source-supported (textbooks, reputable online references, documentation).
- Use simple, clear English suitable for younger learners but still technically correct.
- All chapters written using Spec-Kit Plus workflows (Specs → Sections → Tasks).
- Code examples must run without errors.
- Writing style: educational, structured, with examples.
- Plagiarism: Zero tolerance; content must be original, rewritten, or AI-generated uniquely.
- File structure must be compatible with Docusaurus Markdown format (MDX not required unless needed).

**Constraints:**
- Book length: 8–12 chapters (or as defined by spec).
- Each chapter 800–1500 words.
- Include at least 1–2 diagrams or illustrations per chapter (text-described; images generated later).
- Final output must build successfully in Docusaurus and deploy on GitHub Pages.
- Maintain consistent formatting headings (H1/H2/H3), tables, lists, and code blocks.

## Success Criteria

- Complete book written using Spec-Kit Plus prompts and specifications.
- All chapters free of errors, contradictions, and plagiarism.
- Docusaurus build passes without warnings; GitHub Pages deployment succeeds.
- Content is educational, accurate, and easy for students to learn from.
- Final book is cohesive, well-structured, and technically correct.

## Governance

**Amendment Procedure**: All amendments to this constitution require a documented proposal, review by relevant stakeholders, and formal approval. Significant changes will follow a voting or consensus-building process.
**Versioning Policy**: This constitution follows semantic versioning (MAJOR.MINOR.PATCH). MAJOR increments for backward incompatible changes, MINOR for new principles/sections, and PATCH for clarifications/typo fixes.
**Compliance Review Expectations**: Regular reviews will be conducted to ensure ongoing adherence to these principles. All project artifacts (specs, plans, tasks, code) must align with the current constitution.

**Version**: 0.1.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
