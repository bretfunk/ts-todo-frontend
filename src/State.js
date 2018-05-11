import { Input, List, ListItem } from 'ts-todo';

export type State = {
  item: string,
  items: string[]
};

export const initialState: State = {
  item: '',
  items: []
};

export { Input, List, ListItems };
