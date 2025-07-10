"use client"

import type React from "react"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { translations } from "@/data/translations"

export default function AccessibilitySettingsPage() {
  const { user, updateAccessibilitySettings, language } = useContext(AppContext)
  const t = translations[language].settings.accessibility
  const { toast } = useToast()

  if (!user) return null

  const handleFontSizeChange = (value: "sm" | "md" | "lg") => {
    updateAccessibilitySettings({
      ...user.accessibilitySettings,
      fontSize: value,
    })
  }

  const handleContrastChange = (value: boolean) => {
    updateAccessibilitySettings({
      ...user.accessibilitySettings,
      contrast: value ? "high" : "normal",
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
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base">{t.fontSize.label}</Label>
          <RadioGroup
            value={user.accessibilitySettings.fontSize}
            onValueChange={handleFontSizeChange}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="sm" id="sm" className="peer sr-only" />
              <Label
                htmlFor="sm"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-sm">{t.fontSize.small}</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="md" id="md" className="peer sr-only" />
              <Label
                htmlFor="md"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-base">{t.fontSize.medium}</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="lg" id="lg" className="peer sr-only" />
              <Label
                htmlFor="lg"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-lg">{t.fontSize.large}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">{t.highContrast.label}</Label>
            <p className="text-sm text-muted-foreground">{t.highContrast.description}</p>
          </div>
          <Switch checked={user.accessibilitySettings.contrast === "high"} onCheckedChange={handleContrastChange} />
        </div>
        <Button type="submit">{t.saveChanges}</Button>
      </form>
    </div>
  )
}
