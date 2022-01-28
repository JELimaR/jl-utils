
type TypeChooseEntry<T> = {
    collection: Array<T> | Set<T>,
    exponent?: number,
    randFunction?: () => number
}

type TypeShuffledEntry<T> = {
    array: Array<T>,
    param?: number,
    randFunction?: () => number
}

export default class CollectionsUtilsFunctions {

    private static _instance: CollectionsUtilsFunctions;

    private constructor() { /* this is intentionally */ } 

    static getInstance(): CollectionsUtilsFunctions {
        if (!CollectionsUtilsFunctions._instance) {
            CollectionsUtilsFunctions._instance = new CollectionsUtilsFunctions();
        }
        return CollectionsUtilsFunctions._instance;
    }
    
    choose<T>(entry: TypeChooseEntry<T>): T { 
        let arr = Array.from( entry.collection )
        // entries
        const exponent: number = (entry.exponent) ? entry.exponent : 1;
        const randFunction: () => number = (entry.randFunction) ? entry.randFunction : Math.random;
		if (exponent <= 0) {
			throw new Error(`El exponent es nulo o negativo`)
		}
        let l: number = arr.length;
        if (l > 0) {
            const randomNumber: number = randFunction();
            if (randomNumber > 1 || randomNumber < 0) throw new Error(`randomFunction must return a number between 0 & 1`)
            return arr[Math.floor( Math.pow(randomNumber, exponent) * l)];
        } else {
            throw new Error(`El arreglo tiene largo nulo`)
        }
    }
    
    shuffled<T>(entry: TypeShuffledEntry<T>): T[] {
        const param: number = (entry.param) ? entry.param : 0;
        const randFunction: () => number = (entry.randFunction) ? entry.randFunction : Math.random;
		if (!( param >= 0 && param <= 1 )) {
			throw new Error(
				`El valor de param debe estar entre 0 y 1.
				Provided: ${param}`
			)
		}
		
        type Sorter = {
            data: T,
            value: number
        }

        let newlist = Array<Sorter>(), out: Array<T>;
        const len: number = entry.array.length;
        for (let i = 0; i < len; i++) {
			const value = randFunction()*(1-param)*len + param*(i+1);
            newlist.push({data: entry.array[i], value: value});
        }
        newlist = newlist.sort( (a,b) => a.value - b.value );
        out = newlist.map( (e) => e.data );

        return out;
    }

    private randrange( hi: number, lo: number = 0): number {
        return Math.floor(Math.random() * (hi - lo)) + lo;
    }

}