# Architecture

## Stack Choice

The application uses Next.js with TypeScript and Tailwind CSS.

Reasoning:
- Next.js provides fast routing and deployment
- TypeScript improves maintainability
- Tailwind CSS enables rapid UI development

## System Flow

User Input → Audit Engine → Savings Calculation → Recommendations → Lead Capture

## Components

- Navbar
- AuditForm
- Pricing Data
- Savings Recommendation Engine

## State Management

React useState hooks are used for handling form state.

localStorage is used to persist user input across page refreshes.

## Future Improvements

If scaled to production:
- Add Supabase backend
- Add authentication
- Add email delivery using Resend
- Add analytics dashboard
- Add AI-generated summaries using Anthropic API