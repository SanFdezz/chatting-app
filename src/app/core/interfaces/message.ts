import { Timestamp } from "firebase/firestore";

export interface Message {
  user:string;
  message: string;
  date:string;
  // time:Timestamp;
}
