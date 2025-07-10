"use client"

import { useContext } from "react"
import { AppContext } from "@/app/context/app-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { translations } from "@/data/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentsPage() {
  const { user, language } = useContext(AppContext)
  const t = translations[language]
  const { toast } = useToast()

  if (!user || user.role !== "student") return null

  const handlePayment = () => {
    toast({
      title: t.payments.simulationTitle,
      description: t.payments.simulationDesc,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.payments.status}</CardTitle>
          <CardDescription>{t.payments.monthlyFee}: 5670 Mts</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t.payments.currentStatus}</p>
            <p className={`text-2xl font-bold ${user.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}>
              {t.payments[user.paymentStatus.toLowerCase() as "paid" | "unpaid"]}
            </p>
          </div>
          <Button onClick={handlePayment} disabled={user.paymentStatus === "Paid"}>
            {t.payments.payNow}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t.payments.history}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.payments.month}</TableHead>
                <TableHead>{t.payments.amount}</TableHead>
                <TableHead>{t.payments.date}</TableHead>
                <TableHead className="text-right">{t.payments.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.paymentHistory.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {t.payments.months[payment.month.toLowerCase() as keyof typeof t.payments.months]}
                  </TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={payment.status === "Paid" ? "default" : "destructive"}
                      className={payment.status === "Paid" ? "bg-green-500" : ""}
                    >
                      {t.payments[payment.status.toLowerCase() as "paid" | "unpaid"]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
