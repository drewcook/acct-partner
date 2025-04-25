"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, X, UserPlus, Save } from "lucide-react"

export function TodoListForm({ existingList = null }) {
  const router = useRouter()
  const [title, setTitle] = useState(existingList?.title || "")
  const [description, setDescription] = useState(existingList?.description || "")
  const [tasks, setTasks] = useState(existingList?.tasks || [])
  const [partners, setPartners] = useState(existingList?.partners || [])
  const [newTask, setNewTask] = useState("")
  const [newPartner, setNewPartner] = useState({ name: "", phone: "" })

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: `task-${Date.now()}`, text: newTask, completed: false, nudges: 0 }])
      setNewTask("")
    }
  }

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const addPartner = () => {
    if (newPartner.name && newPartner.phone) {
      setPartners([...partners, { id: `partner-${Date.now()}`, ...newPartner, confirmed: false }])
      setNewPartner({ name: "", phone: "" })
    }
  }

  const removePartner = (partnerId) => {
    setPartners(partners.filter((partner) => partner.id !== partnerId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would save to Firebase
    console.log({ title, description, tasks, partners })
    router.push("/")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <Button type="button" onClick={addTask}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No tasks added yet</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                      <label htmlFor={task.id} className={task.completed ? "line-through text-muted-foreground" : ""}>
                        {task.text}
                      </label>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Accountability Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="partnerName">Name</Label>
            <Input
              id="partnerName"
              placeholder="Partner name"
              value={newPartner.name}
              onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="partnerPhone">Phone Number</Label>
            <Input
              id="partnerPhone"
              placeholder="+1234567890"
              value={newPartner.phone}
              onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
            />
          </div>
        </div>
        <Button type="button" onClick={addPartner} className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>

        <Card>
          <CardContent className="p-4">
            {partners.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No partners added yet</p>
            ) : (
              <ul className="space-y-2">
                {partners.map((partner) => (
                  <li key={partner.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{partner.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">{partner.phone}</span>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePartner(partner.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Save Todo List
        </Button>
      </div>
    </form>
  )
}

