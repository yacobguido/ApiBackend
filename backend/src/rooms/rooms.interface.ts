
export interface Room {
    id: number;
    numberRoom: number;
    type: string;
    pax: number;
    category:string;
    status:string;
  }

export interface BodyRoom{
  numberRoom: string;
  type: string;
  pax: number;
  category:string;
  status:string;
}