# Project Name: Adaptive Skills LMS (منصة التعليم التكيفي)
# Tech Stack:
- Frontend: Next.js 16 (App Router), Tailwind CSS, Shadcn UI, Lucide React (Icons).
- Backend: Next.js Server Actions, Prisma ORM.
- Database: PostgreSQL (via Supabase).
- Auth: Clerk (Next.js SDK).
- Language: Arabic (RTL Interface).

## Core Concept (الفكرة الأساسية)
A smart LMS focused on "Skill Mastery" not just course completion.
The system uses a unified "Taxonomy Tree" (Subject -> Branch -> Skill).
Students take adaptive tests. If they fail a skill, the system forces a "Remedial Plan" (videos + questions) for that specific skill.

## Database Structure (The Blueprint)
1. **User**: Roles (Admin, Manager, Teacher, Student, Parent). Linked to a School (Multi-tenancy).
2. **Taxonomy**: Recursive tree (Math -> Algebra -> Equations).
3. **Course**: Contains Sections -> Lessons.
4. **Question**: HTML content, Type (MCQ), Linked to Taxonomy (Skill), Difficulty, Video Explanation URL.
5. **TestAttempt**: Tracks user score.
6. **StudentMastery**: Tracks proficiency % per skill (0-100%). Updated after every test.
7. **StudyPlan**: AI-generated schedule based on deadline.

## Key Features
- **Video Masking**: Use custom player to hide YouTube links.
- **Saher Test**: Speed-based testing mode.
- **Reports**: Radar Charts for skill analysis.