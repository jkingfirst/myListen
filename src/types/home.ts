export interface Carousel {
  id: number;
  image: string;
  colors: [string, string];
}
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
export interface Guess {
  id: string;
  title: string;
  image: string;
}
export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}
