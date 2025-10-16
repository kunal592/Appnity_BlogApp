# Appnity Blog - Blueprint

## Overview

A modern, responsive blog application built with Next.js and Tailwind CSS. The blog fetches and displays posts from a database, allows for user authentication, and provides a clean and intuitive user experience.

## Project Structure

- `src/app`: Main application logic and routing.
- `src/components`: Reusable React components.
- `src/lib`: Utility functions and data fetching logic.
- `src/app/api/auth`: NextAuth.js API route.

## Design and Features

### General

- **Responsive Design:** The layout adapts to different screen sizes, providing a seamless experience on mobile and desktop.
- **Modern Aesthetics:** The UI is designed with a modern and clean look and feel, using a consistent color palette and typography.
- **Header and Footer:** A consistent header and footer are present on all pages.

### Home Page

- **Hero Section:** A prominent hero section welcomes users to the blog.
- **Search Bar:** A search bar allows users to filter blog posts by title.
- **Blog Post Grid:** Blog posts are displayed in a responsive grid layout.
- **Post Cards:** Each post is represented by a card that includes:
  - Thumbnail image
  - Tags
  - Title
  - Excerpt
  - Author information (name and image)
  - Publication date
- **Pagination:** "Previous" and "Next" buttons allow users to navigate through pages of blog posts.

### Post Page

- **Detailed View:** A dedicated page for viewing the full content of a single blog post.
- **Go Back Button:** A button that allows users to easily navigate back to the home page.
- **Edit Post Button:** A button that is visible only to the author of the post, allowing them to edit it.
- **Styled Content:** The blog post content is beautifully styled using `@tailwindcss/typography`.
- **Comment Section:** A dedicated section for users to leave and view comments.

### About Page

- **Hero Section:** A hero section that introduces the blog.
- **Mission Statement:** A section that explains the purpose and goals of the blog.
- **Meet the Team:** A section that introduces the team behind the blog.

### Create Post Page

- **Authenticated Access:** Only logged-in users can access this page.
- **Create Post Form:** A form with fields for title and content.
- **Rich Text Editor:** Uses Tiptap for a modern writing experience for the post body.
- **Server Action:** Uses a Next.js Server Action to securely handle form submission.

### Edit Post Page

- **Authenticated Access:** Only the author of the post can access this page.
- **Edit Post Form:** A form pre-filled with the post's data (title and content).
- **Rich Text Editor:** Uses Tiptap for a modern writing experience for the post body.
- **Server Action:** Uses a Next.js Server Action to securely handle form submission and update the post.

### Comments

- **Authenticated Commenting:** Only logged-in users can leave comments.
- **Comment Form:** A simple form to submit a new comment.
- **Comment List:** Displays all comments for a post, showing the author's name, image, and the date the comment was posted.

### Authentication

- **NextAuth.js:** User authentication is handled using NextAuth.js.
- **GitHub Provider:** Users can log in using their GitHub accounts.
- **Dynamic Header:** The header displays a "Login" or "Logout" button, and a "Create Post" link for authenticated users.

## Current Plan

### Implemented

- Set up the basic project structure.
- Created a modern and responsive home page that fetches and displays blog posts from a database.
- Updated the `Header` and `Footer` components to match the new design.
- Created a detailed view for individual blog posts.
- Implemented user authentication with NextAuth.js and GitHub.
- Added an "About" page.
- Implemented pagination for the blog posts on the home page.
- Allowed authenticated users to create new blog posts via a dedicated "Create Post" page with a rich text editor.
- Added a search functionality to find posts.
- Allowed authenticated users to edit their own blog posts.
- Implemented a comment section on blog posts, allowing authenticated users to leave comments.

### Next Steps

- Allow users to reply to comments (nested comments).
