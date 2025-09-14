export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      box_join: {
        Row: {
          box_id: string
          created_at: string
          expires_at: string
          id: string
          join_token: string
          owner_id: string
          status: Database["public"]["Enums"]["join_status"]
          updated_at: string
          used_at: string | null
          used_by_user_id: string | null
        }
        Insert: {
          box_id: string
          created_at?: string
          expires_at: string
          id?: string
          join_token: string
          owner_id: string
          status?: Database["public"]["Enums"]["join_status"]
          updated_at?: string
          used_at?: string | null
          used_by_user_id?: string | null
        }
        Update: {
          box_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          join_token?: string
          owner_id?: string
          status?: Database["public"]["Enums"]["join_status"]
          updated_at?: string
          used_at?: string | null
          used_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "box_join_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "user_box"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "box_join_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "box_join_used_by_user_id_fkey"
            columns: ["used_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      box_shares: {
        Row: {
          box_id: string
          created_at: string
          id: string
          member_id: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          box_id: string
          created_at?: string
          id?: string
          member_id: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          box_id?: string
          created_at?: string
          id?: string
          member_id?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "box_shares_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "user_box"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "box_shares_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "box_shares_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_box: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          name: string
          position: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          position?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          position?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_box_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_folder: {
        Row: {
          box_id: string
          color: string | null
          created_at: string | null
          id: string
          is_expanded: boolean | null
          name: string
          parent_id: string | null
          position: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          box_id: string
          color?: string | null
          created_at?: string | null
          id?: string
          is_expanded?: boolean | null
          name: string
          parent_id?: string | null
          position?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          box_id?: string
          color?: string | null
          created_at?: string | null
          id?: string
          is_expanded?: boolean | null
          name?: string
          parent_id?: string | null
          position?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_folder_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "user_box"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_folder_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "user_folder"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_folder_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_link: {
        Row: {
          ai_summary: string | null
          ai_tags: string[] | null
          box_id: string
          created_at: string | null
          description: string | null
          domain: string | null
          favicon_url: string | null
          id: string
          is_public: boolean | null
          parent_id: string | null
          position: number | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          ai_summary?: string | null
          ai_tags?: string[] | null
          box_id: string
          created_at?: string | null
          description?: string | null
          domain?: string | null
          favicon_url?: string | null
          id?: string
          is_public?: boolean | null
          parent_id?: string | null
          position?: number | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          ai_summary?: string | null
          ai_tags?: string[] | null
          box_id?: string
          created_at?: string | null
          description?: string | null
          domain?: string | null
          favicon_url?: string | null
          id?: string
          is_public?: boolean | null
          parent_id?: string | null
          position?: number | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_link_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "user_box"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_link_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "user_folder"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_link_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_link_pin: {
        Row: {
          box_id: string
          created_at: string
          id: string
          link_id: string
          pinned_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          box_id: string
          created_at?: string
          id?: string
          link_id: string
          pinned_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          box_id?: string
          created_at?: string
          id?: string
          link_id?: string
          pinned_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_link_pin_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "user_box"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_link_pin_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "user_link"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_link_pin_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age_group: string | null
          color: string | null
          created_at: string | null
          email: string
          gender: string | null
          id: string
          name: string | null
          nickname: string
          privacy_accepted: boolean | null
          provider: string
          provider_id: string
          terms_accepted: boolean | null
          updated_at: string | null
          visited_box: string | null
        }
        Insert: {
          age_group?: string | null
          color?: string | null
          created_at?: string | null
          email: string
          gender?: string | null
          id?: string
          name?: string | null
          nickname: string
          privacy_accepted?: boolean | null
          provider: string
          provider_id: string
          terms_accepted?: boolean | null
          updated_at?: string | null
          visited_box?: string | null
        }
        Update: {
          age_group?: string | null
          color?: string | null
          created_at?: string | null
          email?: string
          gender?: string | null
          id?: string
          name?: string | null
          nickname?: string
          privacy_accepted?: boolean | null
          provider?: string
          provider_id?: string
          terms_accepted?: boolean | null
          updated_at?: string | null
          visited_box?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_user_with_box: {
        Args: {
          p_age_group: string
          p_color: string
          p_email: string
          p_gender: string
          p_name?: string
          p_nickname: string
          p_privacy_accepted: boolean
          p_provider: string
          p_provider_id: string
          p_terms_accepted: boolean
        }
        Returns: Json
      }
      create_user_with_user_box: {
        Args: {
          p_age_group: string
          p_color: string
          p_email: string
          p_gender: string
          p_name?: string
          p_nickname: string
          p_privacy_accepted: boolean
          p_provider: string
          p_provider_id: string
          p_terms_accepted: boolean
        }
        Returns: Json
      }
      generate_invitation_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_invitation_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_join_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_shareable_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      box_role: "owner" | "admin" | "editor" | "viewer"
      invitation_status: "pending" | "accepted" | "declined" | "expired"
      join_status: "pending" | "accepted" | "expired" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      box_role: ["owner", "admin", "editor", "viewer"],
      invitation_status: ["pending", "accepted", "declined", "expired"],
      join_status: ["pending", "accepted", "expired", "cancelled"],
    },
  },
} as const
