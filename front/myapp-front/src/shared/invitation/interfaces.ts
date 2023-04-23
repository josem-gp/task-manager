export interface Invitation {
  id: number;
  email: string;
  expiration_date: string;
  group_id: number;
  sender_id: number;
  recipient_id: number;
  disabled: boolean;
}

export interface InvitationRequest {
  invitation: Pick<Invitation, "email">;
}

export interface InvitationResponse {
  invitation: Invitation;
  message: string;
}
