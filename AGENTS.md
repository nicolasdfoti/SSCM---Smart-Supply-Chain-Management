# AGENTS.md

# SSCM — Smart Supply Chain Management

## 1. Project Overview

SSCM (Smart Supply Chain Management) is a corporate website and lead management platform for a supply chain management business.

The business connects companies with suppliers and business opportunities in China and other international markets.

The platform has two main areas:

1. Public corporate website
2. Private administrative dashboard

The public website is primarily focused on presenting the company, its services, and generating qualified contact leads.

The private dashboard will later be used to manage leads, clients, and other business information.

---

## 2. Current Scope

The initial public website will contain:

- Home / Landing Page
- About Us (Nosotros)
- Contact (Contacto)

The future private application will contain:

- Admin Login
- Dashboard
- Lead management
- Client management
- Additional business management features as required

The contact form will eventually:

1. Validate the submitted information.
2. Store the lead in PostgreSQL.
3. Notify the business by email.

---

## 3. Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Python
- FastAPI
- SQLAlchemy
- Alembic

### Database

- PostgreSQL

### Email

- Resend or another transactional email provider selected during implementation.

### Deployment

The final deployment platform has not been selected yet.

The application must remain deployable using standard production environments.

---

## 4. Repository Structure

The repository is organized as a monorepo:

```text
sscm/
├── frontend/
├── backend/
├── database/
├── docs/
├── AGENTS.md
├── README.md
├── .env.example
└── .gitignore
```

## 5. Frontend Architecture

The frontend follows a simple component-based architecture.

```text
src/
├── assets/
├── components/
├── layouts/
├── pages/
├── routes/
├── services/
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

### assets/

Static frontend assets such as:

- Logo
- Brand assets
- Images
- Illustrations

Brand assets belong inside:

`src/assets/brand/`

### components/

Reusable UI components.

Components should be created when they are actually reusable or represent a meaningful UI building block.

Do not create components solely to reduce file size.

#### components/layout/

Reusable global layout components such as:

- Navbar
- Footer
- Header
- Navigation elements

#### components/ui/

Generic reusable UI components such as:

- Button
- Input
- Card
- Modal

Only create these components when they are actually needed.

### layouts/

Page-level layout structures.

Examples:

- PublicLayout
- AdminLayout

Do not create layouts until they are required.

### pages/

Top-level route pages.

Examples:

- Home
- About
- Contact
- Login
- Dashboard

Pages should compose components instead of containing unnecessarily large amounts of reusable UI code.

### routes/

Application routing configuration.

All route definitions should be centralized here.

### services/

Communication with external APIs and backend services.

API requests should not be scattered directly throughout UI components.

### types/

Shared TypeScript types and interfaces.

## 6. Frontend Principles

The frontend should prioritize:

Simplicity
Maintainability
Accessibility
Responsiveness
Performance
Clear separation of concerns
Reusable components
Strong TypeScript typing

Avoid unnecessary abstractions.

Do not introduce a state management library unless the application actually requires one.

Do not introduce unnecessary dependencies.

Do not create files, folders, hooks, contexts, services, or abstractions without a concrete use case.

## 7. Routing

React Router will be used for application routing.

The initial public routes are:

/
/about
/contact

A future administrative area will use routes under:

/admin

The admin section must remain separated conceptually from the public website.

Authentication and protected routes will be implemented in a later phase.

Do not implement authentication during the initial frontend setup.

## 8. API Architecture

The frontend must not hardcode backend URLs throughout components.

API communication should eventually be centralized through the /services directory.

Example:

services/
├── api.ts
├── leads.service.ts
└── auth.service.ts

Only create service files when their functionality is required.

Environment-specific API URLs must use environment variables.

Never hardcode production secrets or credentials.

## 9. Brand Identity

The company name is:

SSCM

Full name:

Smart Supply Chain Management

The visual identity should communicate:

Trust
Professionalism
International business
Global supply chains
Reliability
Efficiency
Modern business services

The primary brand color is based on the supplied SSCM logo.

Primary color:

#002840

Suggested secondary colors:

#004B68
#087EA4

Suggested neutral colors:

#F7FAFC
#FFFFFF
#64748B
#CBD5E1
#E2E8F0

These values are starting points, not immutable requirements.

The final visual system should be consistent across the website.

## 10. Design Principles

The website should have a modern B2B corporate aesthetic.

Prioritize:

Clean layouts
Strong typography
Generous whitespace
Clear hierarchy
Professional photography or relevant imagery
Strong calls to action
Responsive design
Mobile usability

Avoid:

Excessive gradients
Excessive animations
Excessive rounded cards
Generic "AI startup" aesthetics
Unnecessary glassmorphism
Excessive shadows
Decorative elements that do not support the business message

The website should look like a real international supply chain company, not a generic template.

## 11. Responsive Design

All public pages must work correctly on:

Desktop
Laptop
Tablet
Mobile

Mobile layouts must be intentionally designed rather than simply shrinking the desktop layout.

Navigation must be usable on small screens.

Forms must remain accessible and usable on mobile devices.

## 12. Accessibility

Follow basic accessibility best practices:

Semantic HTML
Proper heading hierarchy
Accessible form labels
Keyboard navigation
Visible focus states
Sufficient color contrast
Meaningful alt text for images
Buttons for actions and links for navigation

Do not sacrifice accessibility for visual effects.

## 13. SEO

The public website should be structured with SEO in mind.

Each public page should eventually have:

Appropriate document title
Meta description
Semantic HTML
Proper heading hierarchy
Descriptive URLs

Do not implement an advanced SEO system unless required.

## 14. Security

Never commit:

API keys
Passwords
Database credentials
Email credentials
JWT secrets
Production environment variables

Use .env files locally and .env.example for documentation.

The .env file must be ignored by Git.

Never expose backend secrets in frontend code.

## 15. Backend Principles

When backend development begins:

Use FastAPI routers.
Use SQLAlchemy for database access.
Use Pydantic schemas for request and response validation.
Use Alembic for database migrations.
Keep business logic outside route handlers when appropriate.
Validate all external input.
Never manually modify production database schemas when a migration is required.
## 16. Database Principles

PostgreSQL will be the primary database.

The initial business entities are expected to include:

Users
Leads
Clients
Services

However, database models should only be created when their requirements are defined.

Do not invent unnecessary fields or relationships.

Potential lead statuses include:

NEW
CONTACTED
QUALIFIED
CONVERTED
LOST

These are subject to change when the business requirements are finalized.

## 17. Contact Form

The public contact form will eventually collect information such as:

Name
Company
Email
Phone
Country
Service of interest
Message

The exact fields must be confirmed before implementation.

The final flow should be:

Visitor
    ↓
Contact Form
    ↓
Frontend validation
    ↓
FastAPI API
    ↓
Backend validation
    ↓
PostgreSQL
    ↓
Email notification

Never rely exclusively on frontend validation.

## 18. Admin Dashboard

The administrative dashboard will be implemented in a later phase.

Expected functionality:

Authentication
Dashboard overview
Lead management
Client management
Lead status management
Lead details
Basic business metrics

Do not implement the admin dashboard until the public website foundation is stable.

## 19. Development Workflow

Before modifying code:

Read this AGENTS.md.
Inspect the existing project structure.
Inspect the relevant files.
Understand existing implementation before changing it.
Avoid modifying unrelated files.
Reuse existing functionality where appropriate.

When implementing a feature:

Keep the change focused.
Avoid unnecessary dependencies.
Follow the existing architecture.
Use TypeScript types appropriately.
Keep components small enough to understand.
Do not rewrite working code without a reason.

After implementing a feature:

Run the relevant checks.
Run TypeScript validation.
Run the frontend build when frontend code changes.
Fix errors introduced by the implementation.
Report what changed.
Report any remaining issues.
## 20. Important OpenCode Rule

Do not make architectural decisions that are not required by the current task.

Do not implement future features preemptively.

Do not create unnecessary abstractions.

Do not modify backend code when working on a frontend-only task.

Do not modify frontend code when working on an unrelated backend task.

If a requirement is ambiguous and the ambiguity could materially affect the implementation, stop and explain the ambiguity before making assumptions.

The goal is to build SSCM incrementally and intentionally.