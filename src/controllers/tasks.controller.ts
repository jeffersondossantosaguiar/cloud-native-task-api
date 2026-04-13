import { Request, Response } from "express"

const tasks: { id: number; title: string; done: boolean }[] = []
let nextId = 1

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body
  const task = { id: nextId++, title, done: false }
  tasks.push(task)
  res.status(201).json(task)
}

export const listTasks = (req: Request, res: Response) => {
  res.status(200).json(tasks)
}

export const getTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id as string)
  const task = tasks.find((t) => t.id === taskId)
  if (!task) return res.status(404).json({ message: "Task not found" })
  res.status(200).json(task)
}

export const updateTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id as string)
  const task = tasks.find((t) => t.id === taskId)
  if (!task) return res.status(404).json({ message: "Task not found" })
  Object.assign(task, req.body)
  res.status(200).json(task)
}

export const deleteTask = (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id as string)
  const index = tasks.findIndex((t) => t.id === taskId)
  if (index !== -1) tasks.splice(index, 1)
  res.status(204).send()
}
