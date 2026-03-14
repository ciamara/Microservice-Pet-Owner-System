export interface SimpleOwner{
  simpleOwnerId: string;
}
export interface Owner {
  ownerId: string;
  name: string;
  surname: string;
  phoneNumber: number;
  dateOfBirth: string;
  address: string;
}

export interface Pet {
  petId: string;
  name: string;
  animal: string;
  dateOfBirth: string;
  weight: number;
  breed: string;
  color: string;
  gender: string;
  simpleOwner: SimpleOwner;
}
