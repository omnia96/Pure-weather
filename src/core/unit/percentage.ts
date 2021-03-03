export class Percentage {
  private peak = 0;
  valley = 0;
  size = 0;
  constructor(peak: number, valley: number) {
    console.log(peak, valley);
    this.peak = peak + 5;
    this.valley = valley - 5;
    this.size = peak - valley;
  }
  public value(current: number): number {
    return (current - this.valley) / this.size * 100;
  }
}
