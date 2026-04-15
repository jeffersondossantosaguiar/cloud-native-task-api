import express from "express"
import { pool } from "./database"
import taskRoutes from "./routes/tasks.router"

const app = express()
app.use(express.json())
app.use("/tasks", taskRoutes)

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.get("/readyz", async (req, res) => {
  try {
    await pool.query("SELECT 1")
    res.status(200).json({ status: "ready" })
  } catch {
    res.status(503).json({ status: "unavailable" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
