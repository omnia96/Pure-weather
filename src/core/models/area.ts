export class Area {
  public id: string = '';
  public province: string = '';
  public city: string = '';
  public district: string = '';
  public street: string = '';

  constructor(id: string, province?: string, city?: string, district?: string, street?: string) {
    this.id = id;
    if (province != null) {
      this.province = province;
    }
    if (city != null) {
      this.city = city;
    }
    if (district != null) {
      this.district = district;
    }
    if (street != null) {
      this.street = street;
    }
  }
}
