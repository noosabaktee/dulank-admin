export interface B2BSubscription { id: number; user_id: number; plan: string; plan_tier: string; amount: number; created_date: string; expiring_on: string; status: string; features: string[] }
export interface MerchantIntegrationData {
 users: { id: number; name: string; email: string; access: { active: boolean; expiresOn: string | null; plan: string | null } }[]
 subscriptions: B2BSubscription[]
 merchants: { id: number; owner_user_id: number; name: string; type: string; status: string }[]
 content: { title: string; introduction: string; published: boolean }
}
