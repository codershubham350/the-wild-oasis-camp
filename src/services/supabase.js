import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gaaxxeurfnvlmnfeubsb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYXh4ZXVyZm52bG1uZmV1YnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5Mjk0MjIsImV4cCI6MjAxMjUwNTQyMn0.9cvWnnLrzkKKYUkDNIQYMUVsn7BDK99ykmcXxxNbU1g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
