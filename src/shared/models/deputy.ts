interface SocialNetworks {
  twitter?: string,
  facebook?: string,
  youtube?: string,
  blog?: string,
}

export interface Deputy {
  id: number,
  description: string,
  district: string,
  gender: string,
  name: string,
  lastName: string,
  parliamentaryGroup: string,
  positions: string[],
  propertyDeclaration: string,
  registerDate: number,
  socialNetworks: SocialNetworks,

}