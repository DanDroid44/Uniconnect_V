"use client"

import type React from "react"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { translations } from "@/data/translations"

export default function ProfileSettingsPage() {
  const { user, updateUser, language } = useContext(AppContext)
  const t = translations[language].profile
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    email: "",
    bio: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        age: user.age,
        email: user.email,
        bio: user.bio,
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({ ...formData, age: Number(formData.age) })
    toast({
      title: t.updateSuccessTitle,
      description: t.updateSuccessDesc,
    })
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.title}</h3>
        <p className="text-sm text-muted-foreground">{t.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t.fullName}</Label>
          <Input id="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">{t.age}</Label>
            <Input id="age" type="number" value={formData.age} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">{t.bio}</Label>
          <Textarea id="bio" value={formData.bio} onChange={handleChange} placeholder={t.bioPlaceholder} />
        </div>
        <Button type="submit">{t.saveChanges}</Button>
      </form>
    </div>
  )
}
