import HouseImg from '@assets/icons/house.svg';
import BankImg from '@assets/icons/bank.svg';
import PlusImg from '@assets/icons/plus.svg';
import TicketImg from '@assets/icons/ticket.svg';
import FlagImg from '@assets/icons/flag.svg';
import { routes } from '@configs';

export const buttons: { path: string; icon: string }[] = [
  { path: routes.home.path, icon: HouseImg },
  { path: routes.bank.path, icon: BankImg },
  { path: routes.add.path, icon: PlusImg },
  { path: routes.ticket.path, icon: TicketImg },
  { path: routes.government.path, icon: FlagImg },
];
