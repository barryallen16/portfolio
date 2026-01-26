# Blog Management Guide

A simple guide to add, edit, or remove blog posts from your portfolio.

---

## 📁 File Structure

```
├── index.html              # Main portfolio (project cards + blog section)
├── blogs/
│   ├── _template.html      # Template for new blogs
│   ├── fitcheck.html       # FitCheck blog post
│   └── java-vul.html       # Java Vulnerability blog post
```

---

## ➕ Adding a New Blog Post

### Step 1: Create the Blog File

1. Copy `blogs/_template.html` to `blogs/your-project-name.html`
2. Edit the content:
   - Update `<title>` tag
   - Update date, title, and tags in the header
   - Write your content in the sections
   - Update the footer link

### Step 2: Enable the "Read Blog" Button

In `index.html`, find your project card and replace the disabled `<span>` with an active `<a>` link.

**Find this (disabled button):**
```html
<span
  class="p-2 bg-neutral-800 border-neutral-700 border-2 rounded-lg flex gap-2 text-neutral-500 justify-center items-center cursor-not-allowed opacity-50"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
  <p>blog coming soon</p>
</span>
```

**Replace with (active link):**
```html
<a
  href="./blogs/your-project-name.html"
  class="p-2 bg-lime-500/20 border-lime-500/50 border-2 rounded-lg flex gap-2 text-lime-400 justify-center items-center hover:border-lime-500 hover:bg-lime-500/30 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
  <p>read blog</p>
</a>
```

### Step 3: Add a Blog Card

In `index.html`, find the `#blog-grid` section and add a new card before the "Coming Soon" card:

```html
<a href="./blogs/your-project-name.html" class="blog-card group bg-neutral-900 border-2 border-neutral-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
  <div class="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
    <span class="text-6xl">🚀</span>
  </div>
  <div class="p-6">
    <div class="flex gap-2 mb-3">
      <span class="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">backend</span>
    </div>
    <h3 class="text-white text-xl mb-2 group-hover:text-blue-400 transition-colors">Your Blog Title Here</h3>
    <p class="text-white/60 font-mono text-sm mb-4">Short description of your blog post...</p>
    <div class="flex items-center justify-between">
      <span class="text-white/40 text-sm font-mono">Month Year</span>
      <span class="text-blue-400 font-mono text-sm group-hover:translate-x-1 transition-transform">read more →</span>
    </div>
  </div>
</a>
```

---

## ➖ Removing a Blog Post

### Step 1: Delete the Blog File

Delete `blogs/your-project-name.html`

### Step 2: Disable the "Read Blog" Button

In `index.html`, find your project card and replace the active `<a>` with a disabled `<span>`.

**Find this (active link):**
```html
<a
  href="./blogs/your-project-name.html"
  class="p-2 bg-lime-500/20 border-lime-500/50 border-2 rounded-lg flex gap-2 text-lime-400 justify-center items-center hover:border-lime-500 hover:bg-lime-500/30 transition-colors"
>
  <svg>...</svg>
  <p>read blog</p>
</a>
```

**Replace with (disabled button):**
```html
<span
  class="p-2 bg-neutral-800 border-neutral-700 border-2 rounded-lg flex gap-2 text-neutral-500 justify-center items-center cursor-not-allowed opacity-50"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
  <p>blog coming soon</p>
</span>
```

### Step 3: Remove the Blog Card

In `index.html`, find and delete the corresponding `<a class="blog-card ...">...</a>` from the `#blog-grid` section.

---

## 🎨 Color Reference

### Category Tags (for blog files)

```html
<!-- Frontend - Pink -->
<span class="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 font-mono">frontend</span>

<!-- Backend - Blue -->
<span class="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">backend</span>

<!-- UI/UX - Lime -->
<span class="text-xs px-3 py-1 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30 font-mono">ui/ux</span>

<!-- AI - Yellow -->
<span class="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-mono">ai</span>
```

### Blog Card Colors (for index.html)

| Category | Gradient | Hover Border | Text Color |
|----------|----------|--------------|------------|
| Frontend | `from-pink-500 to-pink-700` | `hover:border-pink-500/50` | `text-pink-400` |
| Backend | `from-blue-500 to-blue-700` | `hover:border-blue-500/50` | `text-blue-400` |
| UI/UX | `from-lime-500 to-lime-700` | `hover:border-lime-500/50` | `text-lime-400` |
| AI | `from-yellow-500 to-yellow-700` | `hover:border-yellow-500/50` | `text-yellow-400` |

---

## 📝 Blog Template Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta, Tailwind, Font -->
  </head>
  <body class="bg-[#0e0e0e] min-h-screen">
    <!-- Navigation -->
    <nav>...</nav>

    <!-- Article -->
    <article class="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <!-- Header: date, title, tags -->
      <header>...</header>

      <!-- Content Sections -->
      <section class="mb-10 font-mono">
        <h2 class="text-white text-xl mb-4 font-black">Section Title</h2>
        <p class="text-white/70 leading-relaxed mb-4">Paragraph text...</p>
      </section>

      <!-- More sections... -->

      <!-- Footer -->
      <footer>...</footer>
    </article>
  </body>
</html>
```

### Available Content Elements

```html
<!-- Paragraph -->
<p class="text-white/70 leading-relaxed mb-4">Your text here...</p>

<!-- Bullet List -->
<ul class="text-white/70 leading-relaxed ml-6 mb-4 list-disc space-y-2">
  <li>Item one</li>
  <li><strong class="text-white">Bold label:</strong> with description</li>
</ul>

<!-- Numbered List -->
<ol class="text-white/70 leading-relaxed ml-6 mb-4 list-decimal space-y-2">
  <li>First item</li>
  <li>Second item</li>
</ol>

<!-- Code Block -->
<pre class="bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-x-auto mb-4">
<code class="text-lime-400 font-mono text-sm">// Your code here
const example = "hello";</code></pre>

<!-- Blockquote -->
<blockquote class="border-l-2 border-lime-500 pl-4 text-white/60 italic my-6">
  Your inspiring quote or key insight here.
</blockquote>
```

---

## ✅ Checklist

### Adding a Blog:
- [ ] Copy `blogs/_template.html` to `blogs/new-post.html`
- [ ] Edit content in the new file
- [ ] Update project card button in `index.html` (span → a)
- [ ] Add blog card in `#blog-grid` section

### Removing a Blog:
- [ ] Delete `blogs/post-name.html`
- [ ] Update project card button in `index.html` (a → span)
- [ ] Remove blog card from `#blog-grid` section