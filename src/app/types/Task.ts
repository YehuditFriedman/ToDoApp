export class Task {

    constructor(
      public id: string,
      public name: string,
      public body: string,
      public city?: string,
      public completed?: boolean
    ) {  }
  
  }