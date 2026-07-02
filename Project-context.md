# ZoonotiX
## Veterinary Zoonotic Disease Encyclopedia

> A modern, offline-first, mobile-first Progressive Web Application (PWA) developed for Veterinary Public Health & Epidemiology education.

---

# Vision

ZoonotiX aims to become one of the best freely available veterinary zoonotic disease learning resources for undergraduate veterinary students.

This project is being developed in collaboration with the Department of Veterinary Public Health & Epidemiology.

The goal is to create a professional digital encyclopedia that combines textbook-quality veterinary content with a modern educational experience.

The application should eventually be suitable for:

- BVSc Students
- Veterinary Interns
- Postgraduate Students
- Faculty Members
- Practicing Veterinarians

---

# Mission

Create a digital veterinary encyclopedia that is

- Accurate
- Easy to understand
- Visually engaging
- Mobile-first
- Offline capable
- Fast
- Scalable
- Professional
- Future-proof

This should feel like a premium medical education platform rather than a student project.

---

# Educational Philosophy

The application is NOT

❌ An exam coaching website

❌ A question bank

❌ A mnemonic collection

❌ A PowerPoint replacement

Instead, it is a structured veterinary knowledge base.

Students should naturally understand diseases while studying.

Exam preparation should happen automatically because of the quality of explanations.

---

# Primary Audience

Primary Users

- BVSc 3rd Year Students

Secondary Users

- Veterinary Interns
- Faculty Members
- Veterinary Clinicians
- Public Health Professionals

---

# Core Objectives

The encyclopedia should help students

- Learn diseases conceptually
- Quickly revise important facts
- Understand One Health
- Understand epidemiology
- Visualize disease mechanisms
- Navigate information quickly
- Study anywhere, even offline

---

# Project Scope

Initially

Veterinary Zoonotic Diseases

Future Expansion

- Food Hygiene
- Meat Hygiene
- Milk Hygiene
- Epidemiology
- Veterinary Public Health
- Environmental Hygiene
- Food-borne Diseases
- One Health
- Public Health Legislation
- Wildlife Diseases

The architecture should support future expansion without redesign.

---

# Guiding Principles

Every improvement should satisfy

✔ Better learning

✔ Better usability

✔ Better accessibility

✔ Better maintainability

✔ Better scalability

If a feature does not improve at least one of these areas, it should not be added.

---

# Non-Negotiable Rules

## Rule 1

Never delete existing educational content.

---

## Rule 2

Never shorten veterinary explanations.

---

## Rule 3

Never simplify content merely to reduce page length.

---

## Rule 4

Always preserve educational accuracy.

---

## Rule 5

Always improve incrementally.

Never regenerate the project unnecessarily.

---

## Rule 6

Preserve backwards compatibility whenever possible.

---

## Rule 7

Prefer enhancement over replacement.

---

## Rule 8

The application must remain usable on mobile devices first.

---

## Rule 9

Every illustration must teach something.

Decorative graphics should be avoided.

---

## Rule 10

Every new feature must improve the student experience.

---

# Design Philosophy

Inspired by the quality of

- Amboss
- Complete Anatomy
- Osmosis
- Kenhub
- Apple Human Interface Guidelines
- Google Material Design 3

The interface should be

- Professional
- Clean
- Minimal
- Modern
- Elegant
- Calm
- Educational

---

# UI Principles

Prioritize

- Simplicity
- Readability
- Consistency
- Accessibility
- Mobile usability

Avoid

- Clutter
- Flashy effects
- Excessive animations
- Bright distracting colors

Education always comes first.

---

# Mobile First

Assume

More than 90% of users will access using mobile phones.

Optimize for

- One-hand usage
- Thumb navigation
- Portrait orientation
- Responsive layouts
- Large touch targets
- Fast scrolling

---

# Accessibility

The application should

- Support dark mode
- Support light mode
- Have sufficient color contrast
- Support screen readers
- Have large touch targets
- Use readable typography
- Follow WCAG principles where practical

---

# Performance Goals

The application should

- Load quickly
- Work offline
- Cache assets
- Minimize bundle size
- Use lazy loading
- Optimize images
- Use SVG whenever possible

Performance is a feature.

---

# Technology Stack

Framework

- React

Bundler

- Vite

Language

- TypeScript

Styling

- TailwindCSS

UI Components

- shadcn/ui

Icons

- Lucide Icons

Animations

- Framer Motion

Search

- Fuse.js

Offline Storage

- Dexie (IndexedDB)

Routing

- React Router

Progressive Web App

- Vite PWA Plugin

Deployment

- Netlify / Vercel

---

# Data Philosophy

Educational content must never be hardcoded into components.

Disease data should remain separate from UI.

The interface should render dynamically from structured data.

This enables

- Easier maintenance
- Future expansion
- Better searching
- Better filtering

---

# Disease Structure

Every disease should follow a consistent structure.

- Overview
- Definition
- Etiology
- Causative Organism
- Host Range
- Reservoir
- Vectors
- Distribution
- Epidemiology
- Transmission
- Pathogenesis
- Clinical Signs
- Gross Lesions
- Diagnosis
- Differential Diagnosis
- Treatment
- Prevention
- Control
- Public Health Significance
- One Health Perspective
- Quick Revision
- References

---

# Visual Learning Principles

Illustrations should include

- Transmission diagrams
- Pathogenesis flowcharts
- Reservoir graphics
- Host illustrations
- Diagnostic workflows
- Organ involvement diagrams

Use SVG whenever possible.

Every illustration should have educational value.

---

# Search Goals

Students should be able to search

- Disease names
- Organisms
- Reservoirs
- Hosts
- Symptoms
- Treatments
- Diagnostic tests
- Synonyms
- One Health concepts

Search should work offline.

---

# Navigation Goals

Students should never feel lost.

Navigation should include

- Search
- Filters
- Breadcrumbs
- Related diseases
- Reading progress
- Jump to section
- Bookmarks
- Recently viewed

---

# Content Style Guide

Use

- Clear headings
- Bullet lists
- Tables
- Cards
- Clinical flowcharts
- Concise paragraphs

Avoid

- Walls of text
- Long unbroken paragraphs
- Repetition

---

# Completed Development Phases

## Phase 1

✔ UI Modernization

✔ Mobile-first Design

✔ Better Navigation

✔ Improved Typography

✔ Responsive Layout

✔ Professional Medical UI

✔ Accessibility Improvements

✔ Improved Tables

✔ Better Icons

✔ Better Animations

---

## Phase 2

✔ Project Architecture

✔ React Refactoring

✔ TypeScript Integration

✔ Component Architecture

✔ Better Folder Structure

✔ Scalable Data Model

✔ PWA Foundation

✔ IndexedDB Preparation

✔ Performance Improvements

---

# Upcoming Development Phases

Phase 3

Navigation

Search

Filtering

Bookmarks

Reading History

Glossary

Student Experience

---

Phase 4

Disease Content Expansion

Medical Diagrams

SVG Illustrations

One Health Enrichment

Interactive Visual Learning

---

Phase 5

Advanced Learning Features

Disease Comparison

Interactive Quizzes

Cross-linking

Related Diseases

Interactive Tables

---

Phase 6

Performance Optimization

Accessibility

Offline Improvements

Quality Assurance

Bug Fixes

---

Phase 7

Faculty Review

Veterinary Validation

Content Standardization

Documentation

Deployment

---

# Coding Standards

- Use reusable components
- Avoid duplicate code
- Prefer composition over repetition
- Keep components small
- Use meaningful variable names
- Strong TypeScript typing
- Avoid unnecessary dependencies
- Keep the codebase maintainable

---

# AI Assistant Instructions

If you are an AI assistant contributing to this project:

1. Read this file completely before making changes.

2. Never regenerate the entire project.

3. Never remove educational content.

4. Preserve previous work.

5. Improve incrementally.

6. Maintain consistency.

7. Optimize for students first.

8. Prioritize educational value over visual effects.

9. Explain major architectural decisions before implementing them.

10. Treat this project as production software for a university, not as a student prototype.

---

# Final Goal

When completed, ZoonotiX should become a benchmark veterinary educational platform that combines:

- High-quality veterinary science
- Excellent educational design
- Professional software engineering
- Beautiful user experience
- Mobile-first accessibility
- Offline capability
- Long-term maintainability

Every contribution should move the project closer to this vision.
