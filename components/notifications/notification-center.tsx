"use client"

import { useEffect } from "react"

import { useState } from "react"

import { biaVoxNotificationsQueries, type BiaVoxNotification } from "@/lib/supabase/bia-vox-queries"
import { supabaseClient } from "@/lib/supabase/client" // Declare the supabaseClient variable

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<BiaVoxNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    loadNotifications()

    // Configurar realtime para notificações
    const supabase = supabaseClient()
    const channel = supabase
      .channel("bia_vox_notifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "bia_vox_notifications" }, () => {
        loadNotifications()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadNotifications = async () => {
    try {
      const [allNotifications, unreadNotifications] = await Promise.all([
        biaVoxNotificationsQueries.getAll(),
        biaVoxNotificationsQueries.getUnread(),
      ])

      setNotifications(allNotifications)
      setUnreadCount(unreadNotifications.length)
    } catch (error) {
      console.error("Erro ao carregar notificações:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await biaVoxNotificationsQueries.markAsRead(id)
      await loadNotifications()
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await biaVoxNotificationsQueries.markAllAsRead()
      await loadNotifications()
    } catch (error) {
      console.error("Erro ao marcar todas as notificações como lidas:", error)
    }
  }
}
