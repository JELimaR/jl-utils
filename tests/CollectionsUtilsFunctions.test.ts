import CollectionsUtilsFunctions from '../src/CollectionsUtilsFunctions'
let cuf = CollectionsUtilsFunctions.getInstance()

class TNumber {
	id: number;
	value: number;

	constructor(i: number,v: number) {
		this.id = i;
		this.value = v;
	}
}

// const
const tn = {
	t1: new TNumber(1,11),
	t2: new TNumber(2,22),
	t3: new TNumber(3,33),
	t4: new TNumber(4,44),
	t5: new TNumber(5,55),
	t6: new TNumber(6,66),
	t7: new TNumber(7,77),
	t8: new TNumber(8,88),
};

const a1: Array<TNumber> = [
	tn.t1, tn.t2, tn.t3, tn.t4, tn.t5, tn.t6, tn.t7, tn.t8
]

const n = [1,2,3,4]

let a2: number[] = [];

for (let i=0; i<100000; i++) {
	a2.push( i+1 );
}

test('choose', () => {
	expect( () => cuf.choose([]) ).toThrow();
	expect( () => cuf.choose(a1, 0) ).toThrow();

	let c1 = cuf.choose( a1, 1 );
	expect( a1 ).toContain( c1 );
	

	let out: number[] = [];
	for (let i = 1; i<100000; i++) {
		out.push( cuf.choose(n, 10) )
	}
	let uno = 0, dos = 0, tres = 0, cuatro = 0;
	out.forEach( (o) => {
		switch (o) {
			case 1:
				uno++;
				break;
			case 2:
				dos++;
				break;
			case 3:
				tres++;
				break;
			case 4:
				cuatro++
				break;
		}
		if (o === 1) {
			uno++;
		}
		if (o === 4) {
			cuatro++;
		}
	})
	expect( uno ).toBeGreaterThan( dos )
	expect( uno ).toBeGreaterThan( tres )
	expect( uno ).toBeGreaterThan( cuatro )
	expect( dos ).toBeGreaterThan( tres )

})

test('shuffled', () => {
	expect( () => { cuf.shuffled(a1, 2) } ).toThrow();

	let o1 = cuf.shuffled( a1 );
	expect( o1.length ).toEqual( a1.length )
	o1 = cuf.shuffled( a1, Math.random() );
	expect( o1.length ).toEqual( a1.length )

	o1 = cuf.shuffled( a1, 1 );
	expect( o1 ).toEqual( a1 )

	let o2 = cuf.shuffled( a1, Math.random() );

	o2.forEach( (o) => {
		expect( a1 ).toContain( o )
	} )

	for (let u = 0; u<20; u++) {
		let f1 = cuf.shuffled( a2, 0.40 ), dif1 = 0;
		f1.forEach( (e, i) => {
			dif1 += Math.abs( e - i );
		} )
		let f2 = cuf.shuffled( a2, 0.60 ), dif2 = 0;
		f2.forEach( (e, i) => {
			dif2 += Math.abs( e - i );
		} )

		expect( dif1 ).toBeGreaterThan( dif2 );
	}

	
})