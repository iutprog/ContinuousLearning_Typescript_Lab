

interface ContactV1 {
    id: number ;
    name: string;
    clone?( name: string): ContactV1;

}

//Interface matches properties of ContactV1 but not the methods. So it is not assignable to ContactV1
interface userContact {
    id: number;
    name: string;
    username: string;
}


interface userContactWithTemplate <TExternalId> {
    id: number;
    name: string;
    username: string;
    externalId: TExternalId;
    loadExternalId(): Promise<TExternalId>;
}


function clone<T>(source: T): T {
   return Object.assign({}, source);
}

function cloneAnother<T1, T2 extends T1>(source: T1): T2 {
   return Object.assign({}, source) as T2;
}

const obA: ContactV1 = { id: 1, name: "John Doe" };
const obB = clone(obA);
//const obC = cloneAnother<ContactV1, Date>(obA);  // fails because Date is not assignable to ContactV1
const obC = cloneAnother<ContactV1, userContact>(obA);

const dateRange = { startDate: Date.now(), endDate: Date.now()};
const dateRangeClone = clone(dateRange);