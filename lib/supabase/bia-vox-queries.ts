import { createClient } from "@supabase/supabase-js"

// Function to create a Supabase client
function createBiaVoxSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

// Tipos para as tabelas bia_vox_*
export interface BiaVoxAgendamento {
  id: number
  created_at: string
  nome_responsavel?: string
  nome_aluno?: string
  horario?: string
  dia?: string
  observacoes?: string
  contato?: string
  status?: string
}

export interface BiaVoxNotification {
  id: string
  created_at: string
  type: "message" | "error" | "agendamento" | "followup" | "victory"
  title?: string
  description?: string
  source_table?: string
  source_id?: string
  session_id?: string
  numero?: string
  read: boolean
}

export interface BiaVoxUser {
  id: string
  email: string
  password_hash: string
  name?: string
  created_at: string
  updated_at: string
}

export interface BiaVoxFollowup {
  id: string
  id_closer: string
  numero?: string
  estagio?: string
  mensagem_1?: string
  mensagem_2?: string
  mensagem_3?: string
  mensagem_4?: string
  mensagem_5?: string
  key?: string
  instancia?: string
}

export interface BiaVoxFolowNormal {
  id: string
  numero?: string
  etapa?: number
  last_mensager?: string
  tipo_de_contato?: string
}

export interface BiaVoxKnowbase {
  id: number
  content?: string
  metadata?: any
  embedding?: any
}

export interface BiaVoxChatHistory {
  id: number
  session_id: string
  message: any
}

// Queries para bia_vox_agendamentos
export const biaVoxAgendamentosQueries = {
  getAll: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_agendamentos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as BiaVoxAgendamento[]
  },

  getById: async (id: number) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_agendamentos").select("*").eq("id", id).single()

    if (error) throw error
    return data as BiaVoxAgendamento
  },

  create: async (agendamento: Omit<BiaVoxAgendamento, "id" | "created_at">) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_agendamentos").insert(agendamento).select().single()

    if (error) throw error
    return data as BiaVoxAgendamento
  },

  update: async (id: number, updates: Partial<BiaVoxAgendamento>) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_agendamentos").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data as BiaVoxAgendamento
  },

  delete: async (id: number) => {
    const supabase = createBiaVoxSupabaseClient()
    const { error } = await supabase.from("bia_vox_agendamentos").delete().eq("id", id)

    if (error) throw error
  },

  getByStatus: async (status: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_agendamentos")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as BiaVoxAgendamento[]
  },

  getByContato: async (contato: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_agendamentos")
      .select("*")
      .eq("contato", contato)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as BiaVoxAgendamento[]
  },
}

// Queries para bia_vox_notifications
export const biaVoxNotificationsQueries = {
  getAll: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_notifications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as BiaVoxNotification[]
  },

  getUnread: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_notifications")
      .select("*")
      .eq("read", false)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as BiaVoxNotification[]
  },

  create: async (notification: Omit<BiaVoxNotification, "id" | "created_at">) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_notifications").insert(notification).select().single()

    if (error) throw error
    return data as BiaVoxNotification
  },

  markAsRead: async (id: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_notifications")
      .update({ read: true })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as BiaVoxNotification
  },

  markAllAsRead: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { error } = await supabase.from("bia_vox_notifications").update({ read: true }).eq("read", false)

    if (error) throw error
  },

  getByType: async (type: BiaVoxNotification["type"]) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_notifications")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as BiaVoxNotification[]
  },
}

// Queries para bia_vox_followup
export const biaVoxFollowupQueries = {
  getAll: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_followup").select("*")

    if (error) throw error
    return data as BiaVoxFollowup[]
  },

  getByNumero: async (numero: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_followup").select("*").eq("numero", numero)

    if (error) throw error
    return data as BiaVoxFollowup[]
  },

  getByCloser: async (id_closer: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_followup").select("*").eq("id_closer", id_closer)

    if (error) throw error
    return data as BiaVoxFollowup[]
  },

  create: async (followup: Omit<BiaVoxFollowup, "id">) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_followup").insert(followup).select().single()

    if (error) throw error
    return data as BiaVoxFollowup
  },

  update: async (id: string, updates: Partial<BiaVoxFollowup>) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_followup").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data as BiaVoxFollowup
  },
}

// Queries para bia_vox_folow_normal
export const biaVoxFolowNormalQueries = {
  getAll: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_folow_normal")
      .select("*")
      .order("last_mensager", { ascending: false })

    if (error) throw error
    return data as BiaVoxFolowNormal[]
  },

  getByNumero: async (numero: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_folow_normal").select("*").eq("numero", numero).single()

    if (error) throw error
    return data as BiaVoxFolowNormal
  },

  create: async (folow: Omit<BiaVoxFolowNormal, "id">) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_folow_normal").insert(folow).select().single()

    if (error) throw error
    return data as BiaVoxFolowNormal
  },

  updateEtapa: async (numero: string, etapa: number) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_vox_folow_normal")
      .update({
        etapa,
        last_mensager: new Date().toISOString(),
      })
      .eq("numero", numero)
      .select()
      .single()

    if (error) throw error
    return data as BiaVoxFolowNormal
  },
}

// Queries para bia_vox_knowbase
export const biaVoxKnowbaseQueries = {
  getAll: async () => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_knowbase").select("*")

    if (error) throw error
    return data as BiaVoxKnowbase[]
  },

  search: async (query: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_knowbase").select("*").textSearch("content", query)

    if (error) throw error
    return data as BiaVoxKnowbase[]
  },

  create: async (knowbase: Omit<BiaVoxKnowbase, "id">) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_vox_knowbase").insert(knowbase).select().single()

    if (error) throw error
    return data as BiaVoxKnowbase
  },
}

// Queries para bia_voxn8n_chat_histories
export const biaVoxChatHistoriesQueries = {
  getBySessionId: async (session_id: string) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase
      .from("bia_voxn8n_chat_histories")
      .select("*")
      .eq("session_id", session_id)
      .order("id", { ascending: true })

    if (error) throw error
    return data as BiaVoxChatHistory[]
  },

  create: async (chat: Omit<BiaVoxChatHistory, "id">) => {
    const supabase = createBiaVoxSupabaseClient()
    const { data, error } = await supabase.from("bia_voxn8n_chat_histories").insert(chat).select().single()

    if (error) throw error
    return data as BiaVoxChatHistory
  },
}
