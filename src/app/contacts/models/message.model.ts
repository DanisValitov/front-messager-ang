import { Contact } from "./contact.model";
import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Message {
  id: number;
  content: string;
  sender: string;
  receiver: string;
  date: Date;
}
