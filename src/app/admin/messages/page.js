"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Search, Mail, MailOpen, Trash2, Calendar, Phone, User } from "lucide-react"

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      })
      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const deleteMessage = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" })
        if (response.ok) {
          fetchMessages()
          setSelectedMessage(null)
        }
      } catch (error) {
        console.error("Error deleting message:", error)
      }
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || message.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const unreadCount = messages.filter((msg) => msg.status === "unread").length

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif font-bold text-3xl text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-2">Manage contact form submissions ({unreadCount} unread)</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("unread")}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filterStatus === "read" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("read")}
            >
              Read
            </Button>
          </div>
        </div>

        {/* Messages Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <Card
                  key={message._id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?._id === message._id
                      ? "ring-2 ring-primary bg-primary/5"
                      : message.status === "unread"
                        ? "bg-card border-primary/20"
                        : "bg-card border-border"
                  }`}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (message.status === "unread") {
                      markAsRead(message._id)
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground truncate">{message.name}</h3>
                      <div className="flex items-center gap-1">
                        {message.status === "unread" ? (
                          <Mail className="h-4 w-4 text-primary" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        )}
                        {message.status === "unread" && (
                          <Badge className="bg-primary/10 text-primary text-xs">New</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 truncate">{message.subject}</p>
                    <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No messages found.</p>
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="font-serif font-semibold text-xl text-foreground">{selectedMessage.subject}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{selectedMessage.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{selectedMessage.email}</span>
                        </div>
                        {selectedMessage.phone && selectedMessage.phone !== "Not provided" && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{selectedMessage.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(selectedMessage._id)}
                        disabled={selectedMessage.status === "read"}
                      >
                        <MailOpen className="h-4 w-4 mr-1" />
                        {selectedMessage.status === "read" ? "Read" : "Mark Read"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Message:</h3>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Reply via Email
                      </Button>
                      <Button variant="outline">Forward</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Select a Message</h3>
                  <p className="text-muted-foreground">Choose a message from the list to view its details.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
