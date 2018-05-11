import { Input, List, ListItems } from 'ts-todo';

export interface IState {
  item: string;
  items: string[];
}

export const intitalState: IState = {
  item: '',
  items: []
};

export { Input, List, ListItems };
