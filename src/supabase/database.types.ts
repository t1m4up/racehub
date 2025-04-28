export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      eventorganizers: {
        Row: {
          event_id: number
          role: string | null
          user_id: string
        }
        Insert: {
          event_id: number
          role?: string | null
          user_id: string
        }
        Update: {
          event_id?: number
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "eventorganizers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
        ]
      }
      eventproducts: {
        Row: {
          description: string | null
          event_id: number | null
          event_product_id: number
          max_quantity: number | null
          name: string | null
          price: number | null
          product_type: Database["public"]["Enums"]["product_type"] | null
          remaining_quantity: number | null
        }
        Insert: {
          description?: string | null
          event_id?: number | null
          event_product_id?: number
          max_quantity?: number | null
          name?: string | null
          price?: number | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          remaining_quantity?: number | null
        }
        Update: {
          description?: string | null
          event_id?: number | null
          event_product_id?: number
          max_quantity?: number | null
          name?: string | null
          price?: number | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          remaining_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "eventproducts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
        ]
      }
      events: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          customer_id: string | null
          description: string | null
          end_date: string | null
          event_id: number
          has_meal: boolean | null
          image_url: string | null
          location_id: number | null
          name: string | null
          organizer_website: string | null
          practical_info: string | null
          registration_open: boolean | null
          rules: string | null
          start_date: string | null
          tags: string[] | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          customer_id?: string | null
          description?: string | null
          end_date?: string | null
          event_id?: number
          has_meal?: boolean | null
          image_url?: string | null
          location_id?: number | null
          name?: string | null
          organizer_website?: string | null
          practical_info?: string | null
          registration_open?: boolean | null
          rules?: string | null
          start_date?: string | null
          tags?: string[] | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          customer_id?: string | null
          description?: string | null
          end_date?: string | null
          event_id?: number
          has_meal?: boolean | null
          image_url?: string | null
          location_id?: number | null
          name?: string | null
          organizer_website?: string | null
          practical_info?: string | null
          registration_open?: boolean | null
          rules?: string | null
          start_date?: string | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "events_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "georeferences"
            referencedColumns: ["id"]
          },
        ]
      }
      georeferences: {
        Row: {
          city_name: string | null
          id: number
          insee_code: string | null
          label: string | null
          lat: number | null
          lng: number | null
          postal_code: string | null
          street_name: string | null
          street_number: string | null
        }
        Insert: {
          city_name?: string | null
          id?: number
          insee_code?: string | null
          label?: string | null
          lat?: number | null
          lng?: number | null
          postal_code?: string | null
          street_name?: string | null
          street_number?: string | null
        }
        Update: {
          city_name?: string | null
          id?: number
          insee_code?: string | null
          label?: string | null
          lat?: number | null
          lng?: number | null
          postal_code?: string | null
          street_name?: string | null
          street_number?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          customer_id: string | null
          payment_date: string | null
          payment_id: number
          payment_status: string | null
          registration_ids: number[] | null
          stripe_transaction_id: string | null
          total_amount: number | null
          user_id: string | null
        }
        Insert: {
          customer_id?: string | null
          payment_date?: string | null
          payment_id?: number
          payment_status?: string | null
          registration_ids?: number[] | null
          stripe_transaction_id?: string | null
          total_amount?: number | null
          user_id?: string | null
        }
        Update: {
          customer_id?: string | null
          payment_date?: string | null
          payment_id?: number
          payment_status?: string | null
          registration_ids?: number[] | null
          stripe_transaction_id?: string | null
          total_amount?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          date_of_birth: string | null
          email: string | null
          emergency_contact_phone: string | null
          first_name: string | null
          gender: string | null
          last_name: string | null
          nationality: string | null
          parental_authorization_url: string | null
          residence_postal_code: string | null
          sports_eligibility_document_type:
            | Database["public"]["Enums"]["sports_eligibility_document_type"]
            | null
          sports_eligibility_document_url: string | null
          sports_eligibility_uploaded_date: string | null
          user_id: string
        }
        Insert: {
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          gender?: string | null
          last_name?: string | null
          nationality?: string | null
          parental_authorization_url?: string | null
          residence_postal_code?: string | null
          sports_eligibility_document_type?:
            | Database["public"]["Enums"]["sports_eligibility_document_type"]
            | null
          sports_eligibility_document_url?: string | null
          sports_eligibility_uploaded_date?: string | null
          user_id: string
        }
        Update: {
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_phone?: string | null
          first_name?: string | null
          gender?: string | null
          last_name?: string | null
          nationality?: string | null
          parental_authorization_url?: string | null
          residence_postal_code?: string | null
          sports_eligibility_document_type?:
            | Database["public"]["Enums"]["sports_eligibility_document_type"]
            | null
          sports_eligibility_document_url?: string | null
          sports_eligibility_uploaded_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      raceresults: {
        Row: {
          bib_number: string | null
          dnf: boolean | null
          dq: boolean | null
          finish_time: unknown | null
          notes: string | null
          position: number | null
          race_id: number | null
          recorded_at: string | null
          registration_id: number | null
          result_id: number
        }
        Insert: {
          bib_number?: string | null
          dnf?: boolean | null
          dq?: boolean | null
          finish_time?: unknown | null
          notes?: string | null
          position?: number | null
          race_id?: number | null
          recorded_at?: string | null
          registration_id?: number | null
          result_id?: number
        }
        Update: {
          bib_number?: string | null
          dnf?: boolean | null
          dq?: boolean | null
          finish_time?: unknown | null
          notes?: string | null
          position?: number | null
          race_id?: number | null
          recorded_at?: string | null
          registration_id?: number | null
          result_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "raceresults_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "raceresults_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["registration_id"]
          },
        ]
      }
      races: {
        Row: {
          course_category: Database["public"]["Enums"]["course_category"] | null
          course_type: Database["public"]["Enums"]["course_type"] | null
          description: string | null
          distance: number | null
          distance_unit: string | null
          event_id: number | null
          finish_location_id: number | null
          max_participants: number | null
          name: string | null
          price: number | null
          race_id: number
          registration_deadline: string | null
          registration_open: boolean | null
          start_date: string | null
          start_location_id: number | null
        }
        Insert: {
          course_category?:
            | Database["public"]["Enums"]["course_category"]
            | null
          course_type?: Database["public"]["Enums"]["course_type"] | null
          description?: string | null
          distance?: number | null
          distance_unit?: string | null
          event_id?: number | null
          finish_location_id?: number | null
          max_participants?: number | null
          name?: string | null
          price?: number | null
          race_id?: number
          registration_deadline?: string | null
          registration_open?: boolean | null
          start_date?: string | null
          start_location_id?: number | null
        }
        Update: {
          course_category?:
            | Database["public"]["Enums"]["course_category"]
            | null
          course_type?: Database["public"]["Enums"]["course_type"] | null
          description?: string | null
          distance?: number | null
          distance_unit?: string | null
          event_id?: number | null
          finish_location_id?: number | null
          max_participants?: number | null
          name?: string | null
          price?: number | null
          race_id?: number
          registration_deadline?: string | null
          registration_open?: boolean | null
          start_date?: string | null
          start_location_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "races_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "races_finish_location_id_fkey"
            columns: ["finish_location_id"]
            isOneToOne: false
            referencedRelation: "georeferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "races_start_location_id_fkey"
            columns: ["start_location_id"]
            isOneToOne: false
            referencedRelation: "georeferences"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          bib_number: string | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string | null
          gender: string | null
          has_meal: boolean | null
          last_name: string | null
          medical_certificate_valid: boolean | null
          nationality: string | null
          parental_authorization_status:
            | Database["public"]["Enums"]["validation_status"]
            | null
          race_id: number | null
          registration_id: number
          sports_eligibility_document_status:
            | Database["public"]["Enums"]["validation_status"]
            | null
          status: string | null
          team_or_club_name: string | null
          user_id: string | null
        }
        Insert: {
          bib_number?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          gender?: string | null
          has_meal?: boolean | null
          last_name?: string | null
          medical_certificate_valid?: boolean | null
          nationality?: string | null
          parental_authorization_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
          race_id?: number | null
          registration_id?: number
          sports_eligibility_document_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
          status?: string | null
          team_or_club_name?: string | null
          user_id?: string | null
        }
        Update: {
          bib_number?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          gender?: string | null
          has_meal?: boolean | null
          last_name?: string | null
          medical_certificate_valid?: boolean | null
          nationality?: string | null
          parental_authorization_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
          race_id?: number | null
          registration_id?: number
          sports_eligibility_document_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
          status?: string | null
          team_or_club_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
      registrationstatushistory: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          history_id: number
          new_status: string | null
          old_status: string | null
          registration_id: number | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          history_id?: number
          new_status?: string | null
          old_status?: string | null
          registration_id?: number | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          history_id?: number
          new_status?: string | null
          old_status?: string | null
          registration_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "registrationstatushistory_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["registration_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      course_category:
        | "running"
        | "cycling"
        | "swimming"
        | "triathlon"
        | "other"
      course_type:
        | "trail"
        | "urban-trail"
        | "running-race"
        | "cross-country"
        | "youth"
        | "obstacle-race"
        | "fun-run"
        | "mountain-biking-mtb"
        | "gravel-biking"
        | "cyclosportive"
        | "walking"
        | "nordic-walking"
        | "triathlon"
        | "run-and-bike"
        | "duathlon"
        | "aquathlon"
        | "swimrun"
        | "swimming"
        | "adventure-raid"
        | "bootcamp"
        | "orienteering"
        | "canicross"
        | "skiing"
        | "biathlon"
        | "snowshoeing"
        | "roller-skating"
        | "kayaking"
        | "paddleboarding"
        | "rowing"
        | "multi-sport-challenge"
        | "other"
      product_type: "meal" | "tshirt" | "other"
      sports_eligibility_document_type: "medical-certificate" | "sports-license"
      validation_status:
        | "waiting-document"
        | "waiting-validation"
        | "validated"
        | "invalid-date"
        | "invalid-sport"
        | "invalid-illegible"
        | "invalid-others"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      course_category: ["running", "cycling", "swimming", "triathlon", "other"],
      course_type: [
        "trail",
        "urban-trail",
        "running-race",
        "cross-country",
        "youth",
        "obstacle-race",
        "fun-run",
        "mountain-biking-mtb",
        "gravel-biking",
        "cyclosportive",
        "walking",
        "nordic-walking",
        "triathlon",
        "run-and-bike",
        "duathlon",
        "aquathlon",
        "swimrun",
        "swimming",
        "adventure-raid",
        "bootcamp",
        "orienteering",
        "canicross",
        "skiing",
        "biathlon",
        "snowshoeing",
        "roller-skating",
        "kayaking",
        "paddleboarding",
        "rowing",
        "multi-sport-challenge",
        "other",
      ],
      product_type: ["meal", "tshirt", "other"],
      sports_eligibility_document_type: [
        "medical-certificate",
        "sports-license",
      ],
      validation_status: [
        "waiting-document",
        "waiting-validation",
        "validated",
        "invalid-date",
        "invalid-sport",
        "invalid-illegible",
        "invalid-others",
      ],
    },
  },
} as const
