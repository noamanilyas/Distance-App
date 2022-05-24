export interface IPartner {
  id: number;
  organization: string;
  offices: string[];
}

export type PartnerProps = {
  partner: IPartner;
};

export type ApiDataType = {
  error: boolean;
  status: boolean;
  result: IPartner[];
};
