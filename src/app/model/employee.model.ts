export class Employee {
  public Id: string;
  public EmployeeName: string;
  public StarTimeUtc: Date;
  public EndTimeUtc: Date;
  public EntryNotes: string;
  public DeletedOn: string;

  constructor(id: string, employeeName: string, startTimeUtc: Date, endTimeUtc: Date, entryNotes: string, deletedOn: string){
    this.Id = id;
    this.EmployeeName = employeeName;
    this.StarTimeUtc = startTimeUtc;
    this.EndTimeUtc = endTimeUtc;
    this.EntryNotes = entryNotes;
    this.DeletedOn = deletedOn
  }
}
