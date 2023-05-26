export interface Roots {
    kind: string
    users: User[]
  }
  
  export interface User {
    localId: string
    email: string
    displayName: string
    photoUrl: string
    emailVerified: boolean
    providerUserInfo: ProviderUserInfo[]
    validSince: string
    lastLoginAt: string
    createdAt: string
    lastRefreshAt: string
  }
  
  export interface ProviderUserInfo {
    providerId: string
    displayName: string
    photoUrl: string
    federatedId: string
    email: string
    rawId: string
  }
  