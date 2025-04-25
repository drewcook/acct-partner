"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Edit, Trash2, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - would come from Firebase in the real app
const mockTodoLists = [
  {
    id: "1",
    title: "Fitness Goals",
    description: "My workout and nutrition plan",
    tasks: [
      { id: "t1", text: "Go to the gym 3x this week", completed: false, nudges: 2 },
      { id: "t2", text: "Meal prep on Sunday", completed: true, nudges: 0 },
      { id: "t3", text: "Track calories daily", completed: false, nudges: 1 },
    ],
    partners: [
      { id: "p1", name: "Alex", phone: "+1234567890", confirmed: true },
      { id: "p2", name: "Jamie", phone: "+0987654321", confirmed: false },
    ],
  },
  {
    id: "2",
    title: "Work Projects",
    description: "Deadlines and milestones",
    tasks: [
      { id: "t4", text: "Complete project proposal", completed: false, nudges: 0 },
      { id: "t5", text: "Schedule client meeting", completed: false, nudges: 0 },
    ],
    partners: [{ id: "p3", name: "Taylor", phone: "+1122334455", confirmed: true }],
  },
]

export function TodoLists() {
  const [todoLists, setTodoLists] = useState(mockTodoLists)

  const deleteList = (id: string) => {
    setTodoLists(todoLists.filter((list) => list.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todoLists.map((list) => (
        <Card key={list.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{list.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/edit/${list.id}`}>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => deleteList(list.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>{list.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              {list.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    task.completed ? "bg-muted line-through text-muted-foreground" : "bg-card"
                  }`}
                >
                  <span>{task.text}</span>
                  {task.nudges > 0 && (
                    <Badge variant="secondary" className="flex items-center">
                      <Bell className="h-3 w-3 mr-1" />
                      {task.nudges}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full">
              <p className="text-sm font-medium mb-2">Accountability Partners:</p>
              <div className="flex flex-wrap gap-2">
                {list.partners.map((partner) => (
                  <Badge key={partner.id} variant={partner.confirmed ? "default" : "outline"}>
                    {partner.name} {!partner.confirmed && "(Pending)"}
                  </Badge>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

