export type Office = {
  location: string;
  address: string;
  coordinates: string;
};

export interface Partner {
  id: number;
  urlName: string;
  organization: string;
  customerLocations: string;
  willWorkRemotely: boolean;
  website: string;
  services: string;
  offices: Office[];
}
