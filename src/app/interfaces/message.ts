import { Timestamp } from "firebase/firestore";

export interface Message {
  user:string;
  message: string;
  localization:string;
  time:Timestamp;
}
