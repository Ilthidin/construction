-- Add publish status to blog posts.
-- draft posts are hidden from the public API (filtered in the GET route
-- handler) and only become visible after being set to 'published'.

alter table public.blog_posts
  add column if not exists status text not null default 'published'
  check (status in ('published', 'draft'));
