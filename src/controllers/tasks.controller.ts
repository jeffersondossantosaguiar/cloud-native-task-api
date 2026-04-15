import { Request, Response } from "express"
import { pool } from "../database"

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body
  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  )
  const task = result.rows[0]
  res.status(201).json(task)
}

export const listTasks = async (req: Request, res: Response) => {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY created_at DESC"
  )
  res.status(200).json(result.rows)
}

export const getTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id as string)
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [taskId])
  const task = result.rows[0]
  if (!task) return res.status(404).json({ message: "Task not found" })
  res.status(200).json(task)
}

export const updateTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id as string)
  const { title, done } = req.body
  const fields = []
  const values = []
  let index = 1

  if (title !== undefined) {
    fields.push(`title = $${index++}`)
    values.push(title)
  }

  if (done !== undefined) {
    fields.push(`done = $${index++}`)
    values.push(done)
  }

  if (fields.length === 0)
    return res.status(400).json({ message: "No fields to update" })

  const result = await pool.query(
    `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
    [...values, taskId]
  )
  const task = result.rows[0]
  if (!task) return res.status(404).json({ message: "Task not found" })
  res.status(200).json(task)
}

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id as string)
  await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [taskId])
  res.status(204).send()
}
