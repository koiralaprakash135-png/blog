# Supabase Blog Frontend

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file in root with:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Run dev server:
   ```bash
   npm run dev
   ```

## Notes
- Posts are fetched from Supabase `posts` table.
- Cover images should be stored in a Supabase storage bucket with public URLs.
