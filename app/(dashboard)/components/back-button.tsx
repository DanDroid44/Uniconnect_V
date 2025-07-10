"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { translations } from "@/data/translations"

export function BackButton() {
  const router = useRouter()
  const { language } = useContext(AppContext)
  const t = translations[language]

  return (
    <Button variant="outline" onClick={() => router.back()} className="mb-4">
      <ArrowLeft className="mr-2 h-4 w-4" />
      {t.common.back}
    </Button>
  )
}
