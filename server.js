const PORT = 3001;
const express = require("express");
const cors = require("cors");
const supabase = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const SUPABASE_URL = "https://exgkkbygfgyxpigotesp.supabase.co";
const SUPABASE_SERVICE_ROLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z2trYnlnZmd5eHBpZ290ZXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDYzNTgyNCwiZXhwIjoyMDMwMjExODI0fQ.NRvI5mE-8zb3DmSNcLaAysHRnw_Jz4t9ZGbWBvAq-8E";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

app.get("/", async (req, res) => {
  const getBlog = await db.from("blog").select();
  res.json({ getBlog });
});

app.post("/", async (req, res) => {
  const { title, description } = req.body;
  const createPost = await db.from("blog").insert({ title, description });
  console.log("🚀 ~ app.post ~ createPost:", createPost);
  console.log(title, description);

  res.json(createPost);
});

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
