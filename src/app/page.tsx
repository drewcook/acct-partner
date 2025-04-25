import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { TodoLists } from "@/components/todo-lists"

export const metadata: Metadata = {
  title: "Accountability Partner",
  description: "Share your todo lists with accountability partners",
}

export default function Home() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Todo Lists</h1>
          <p className="text-muted-foreground">Create and manage your todo lists with accountability partners</p>
        </div>
        <Link href="/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New List
          </Button>
        </Link>
      </div>

      <TodoLists />
    </div>
  )
}

