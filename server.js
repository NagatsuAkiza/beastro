const PORT = 3001;
const express = require("express");
const cors = require("cors");
const supabase = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const SUPABASE_URL = "-";
const SUPABASE_SERVICE_ROLE =
  "-";

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
