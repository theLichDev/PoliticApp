export interface Initiative {
  id: number,
  description: string,
  type: string,
  parliamentaryGroup: string,
  state: string,
  presentationDate: number,
  processingResult?: string,
  votingResult?: Voting,
  publicOpinion: Opinion
}

interface Voting {
  agree: number,
  disagree: number,
  abstentions: number
}

interface Opinion {
  agree: number,
  disagree: number
}