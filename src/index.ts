import express from "express"

const app = express()
app.use(express.json())

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.get("/readyz", (req, res) => {
  res.status(200).json({ status: "ready" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
