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
