"use client"

import type React from "react"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { translations } from "@/data/translations"

export default function LanguageSettingsPage() {
  const { language, setLanguage } = useContext(AppContext)
  const t = translations[language].settings.language
  const { toast } = useToast()

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
        <RadioGroup value={language} onValueChange={(val: "en" | "pt") => setLanguage(val)} className="space-y-2">
          <Label
            htmlFor="en"
            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span>English</span>
            <RadioGroupItem value="en" id="en" />
          </Label>
          <Label
            htmlFor="pt"
            className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span>Português</span>
            <RadioGroupItem value="pt" id="pt" />
          </Label>
        </RadioGroup>
        <Button type="submit">{t.saveChanges}</Button>
      </form>
    </div>
  )
}
