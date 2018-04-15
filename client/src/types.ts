export type NewGreeting = {
  greeting: string;
  name: string;
};

export type Greeting = NewGreeting & {
  id: number;
};

export type GreetingChartData = { label: string; value: number }[];
