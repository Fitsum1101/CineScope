"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ban, CheckCircle, Mail } from "lucide-react";

export function UserManagementTable() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      joined: "2024-01-15",
      status: "active",
      movies: 142,
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@example.com",
      joined: "2024-02-20",
      status: "active",
      movies: 89,
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      joined: "2024-03-10",
      status: "suspended",
      movies: 34,
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      joined: "2024-01-05",
      status: "active",
      movies: 201,
    },
    {
      id: 5,
      name: "James Brown",
      email: "james@example.com",
      joined: "2024-02-28",
      status: "active",
      movies: 67,
    },
  ]);

  const handleSuspend = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "suspended" : "active",
            }
          : user
      )
    );
  };

  return (
    <div className="mb-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          User <span className="text-primary">Management</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  User
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Joined
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Movies
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-4 px-4 text-foreground font-medium">
                    {user.name}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.joined}
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.movies}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status === "active" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Ban className="w-3 h-3" />
                      )}
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`border-${
                          user.status === "active" ? "red" : "green"
                        }-500/30 text-${
                          user.status === "active" ? "red" : "green"
                        }-400 hover:bg-${
                          user.status === "active" ? "red" : "green"
                        }-500/10`}
                        onClick={() => handleSuspend(user.id)}
                      >
                        {user.status === "active" ? (
                          <Ban className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-secondary/30 border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-foreground font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="text-foreground ml-1">{user.joined}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Movies:</span>
                  <span className="text-foreground ml-1">{user.movies}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-primary/30 text-primary bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleSuspend(user.id)}
                >
                  {user.status === "active" ? "Suspend" : "Activate"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
