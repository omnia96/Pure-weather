export class Percentage {
  private peak = 0;
  valley = 0;
  size = 0;
  constructor(peak: number, valley: number) {
    this.size = peak - valley;
    this.peak = peak + 0.2 * this.size;
    this.valley = valley - 0.2 * this.size;
  }
  public value(current: number): number {
    return (current - this.valley) / this.size * 100;
  }
}
