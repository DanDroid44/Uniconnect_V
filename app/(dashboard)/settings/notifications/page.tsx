"use client"

import type React from "react"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { translations } from "@/data/translations"

export default function NotificationSettingsPage() {
  const { user, updateNotificationPreferences, language } = useContext(AppContext)
  const t = translations[language].settings.notifications
  const { toast } = useToast()

  if (!user) return null

  const handleToggle = (key: "email" | "push" | "inApp", value: boolean) => {
    updateNotificationPreferences({
      ...user.notificationPreferences,
      [key]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: t.saveSuccessTitle,
      description: t.saveSuccessDesc,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.title}</h3>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">{t.email.label}</Label>
            <p className="text-sm text-muted-foreground">{t.email.description}</p>
          </div>
          <Switch
            checked={user.notificationPreferences.email}
            onCheckedChange={(value) => handleToggle("email", value)}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">{t.push.label}</Label>
            <p className="text-sm text-muted-foreground">{t.push.description}</p>
          </div>
          <Switch
            checked={user.notificationPreferences.push}
            onCheckedChange={(value) => handleToggle("push", value)}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">{t.inApp.label}</Label>
            <p className="text-sm text-muted-foreground">{t.inApp.description}</p>
          </div>
          <Switch
            checked={user.notificationPreferences.inApp}
            onCheckedChange={(value) => handleToggle("inApp", value)}
          />
        </div>
        <Button type="submit">{t.saveChanges}</Button>
      </form>
    </div>
  )
}
