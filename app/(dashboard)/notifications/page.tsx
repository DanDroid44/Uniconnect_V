"use client"

import { useContext, useState, useMemo } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations } from "@/data/translations"
import { formatDistanceToNow } from "date-fns"
import { pt, enUS } from "date-fns/locale"

export default function NotificationsPage() {
  const { notifications, language } = useContext(AppContext)
  const t = translations[language].notifications
  const dateLocale = language === "pt" ? pt : enUS

  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  const sources = useMemo(() => [...new Set(notifications.map((n) => n.sender))], [notifications])

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((n) => (urgencyFilter === "all" ? true : n.urgency.toLowerCase() === urgencyFilter))
      .filter((n) => (sourceFilter === "all" ? true : n.sender === sourceFilter))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [notifications, urgencyFilter, sourceFilter])

  const getUrgencyBadge = (urgency: "Low" | "Medium" | "High") => {
    switch (urgency) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t.filterUrgency} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allUrgencies}</SelectItem>
                <SelectItem value="low">{t.urgency.low}</SelectItem>
                <SelectItem value="medium">{t.urgency.medium}</SelectItem>
                <SelectItem value="high">{t.urgency.high}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t.filterSource} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allSources}</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border rounded-lg flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <Badge variant={getUrgencyBadge(notification.urgency)}>
                        {t.urgency[notification.urgency.toLowerCase() as keyof typeof t.urgency]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.content}</p>
                  </div>
                  <div className="text-sm text-muted-foreground text-left md:text-right">
                    <p>{notification.sender}</p>
                    <p>
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true, locale: dateLocale })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">{t.noNotifications}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
