
import Tree from '../Tree'

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


test('create tree', () => {
	let t = new Tree( tn.t8 );
	expect( t.root ).toEqual( tn.t8 )
})

test('add child and get children', () => {
	let t = new Tree( tn.t1 );
	t.addChild( tn.t2 );
	t.addChild( tn.t3 );
	let t4 = t.addChild( tn.t4 );

	expect( t.children.length ).toBe( 3 );
	t4.addChild( tn.t5 )
	t4.addChild( tn.t6 )
	expect( t.children.length ).toBe( 3 );
	expect( t4.children.length ).toBe( 2 );
})

test('add subchild', () => {
	let t1 = new Tree( tn.t1 );
	let t2 = t1.addChild( tn.t2 );
	t2.addChild( tn.t3 );
	let t2copy = new TNumber(2,45);
	
	expect( () => { t2.addChild( t2copy ); } ).toThrow();
	expect( t1.children ).not.toContain( tn.t3 );
	expect( t2.children ).toContain( tn.t3 );
	t1.addChild( t2copy );
	expect( t1.children.length ).toEqual(1);
})

test('get children trees', () => {
	let t = new Tree( tn.t1 );
	expect( t.childrenTrees.length ).toEqual(0);
	t.addChild( tn.t2 );
	expect( t.childrenTrees.length ).toEqual(1);
	t.addChild( tn.t2 );
	expect( t.childrenTrees.length ).toEqual(1);
	let tree3 = t.addChild( tn.t3 );
	expect( t.childrenTrees.length ).toEqual(2);
	expect( t.childrenTrees ).toContain( tree3 );
})

test('get father, fatherTree and ancients', () => {
	let t = new Tree( tn.t1 );
	expect( t.father ).toBeUndefined();
	expect( t.fatherTree ).toBeUndefined();
	expect( t.ancients.length ).toEqual(0);
	let t2 = t.addChild( tn.t2 );
	t2.addChild( tn.t3 );
	expect( t2.fatherTree ).toEqual( t )
	expect( t2.ancients ).toContain( tn.t1 )
	let t4 = t2.addChild( tn.t4 );
	expect( t4.father ).toEqual( tn.t2 )
	expect( t4.ancients ).toContain( tn.t1 )
	expect( t4.ancients ).toContain( tn.t2 )
	expect( t4.ancients ).not.toContain( tn.t3 )
	let t5 = t4.addChild( tn.t5 );
	expect( t5.ancients ).toContain( tn.t1 )
	expect( t5.ancients ).not.toContain( tn.t3 )
})

test('brothers', () => {
	let t = new Tree( tn.t1 );
	expect( t.brothers.length ).toEqual(0);
	let t2 = t.addChild( tn.t2 );
	let t3 = t.addChild( tn.t3 );
	expect( t2.brothers ).toContain( tn.t3 )
	expect( t3.brothers ).toContain( tn.t2 )
	expect( t3.brothers ).not.toContain( tn.t3 )
	let t4 = t2.addChild( tn.t4 );
	t2.addChild( tn.t5 );
	t2.addChild( tn.t6 );
	t2.addChild( tn.t7 );

	expect( t4.brothers.length ).toEqual(3)

})

test('remove child', () => {
	let t = new Tree( tn.t1 );
	t.addChild( tn.t2 )
	t.addChild( tn.t3 )
	t.addChild( tn.t4 )
	expect( t.children.length ).toEqual( 3 )
	t.removeChild( 2 )
	expect( t.children.length ).toEqual( 2 )
	expect( t.children ).not.toContain( tn.t2 )
	t.removeChild( 2 )
	expect( t.children.length ).toEqual( 2 )
	t.removeChild( 3 )
	expect( t.children ).not.toContain( tn.t3 )
	expect( t.children ).toContain( tn.t4 )
	t.removeChild( 4 )
	expect( t.children.length ).toEqual( 0 )
})

test('getTreeIds y getTreeRoots', () => {
	let t = new Tree( tn.t1 );
	let a1 = t.getTreeIds()
	expect( a1 ).toEqual( {root: 1, children: []} )
	let r1 = t.getTreeRoots()
	expect( r1 ).toEqual( {root: tn.t1, children: []} )
	let t2 = t.addChild( tn.t2 )
	t.addChild( tn.t3 )
	a1 = t.getTreeIds()
	expect( a1 ).toEqual( {
		root: 1,
		children: [
			{root: 2, children: []},
			{root: 3, children: []}
		]} )
	let a2 = t2.getTreeIds();
	expect( a2.root ).toEqual( 2 );
	t.addChild( tn.t4 )
	t.addChild( tn.t5 )
	t2.addChild( tn.t6 )
	expect( a1 ).toEqual( {
		root: 1,
		children: [
			{root: 2, children: []},
			{root: 3, children: []}
		]} )
	a1 = t.getTreeIds();
	expect( a1 ).toEqual( {
		root: 1,
		children: [
			{root: 2, children: [
				{root: 6, children: []}
			]},
			{root: 3, children: []},
			{root: 4, children: []},
			{root: 5, children: []}
		]} )
	r1 = t.getTreeRoots();
	expect( r1.children[0].children[0].root.id ).toEqual(6)
	expect( r1.children[3].root ).toEqual(tn.t5)
	expect( r1.children.length ).toEqual( 4 )
})

test('get by id', () => {
	let t1 = new Tree( tn.t1 );
	let r1 = t1.getRootById( 1 )
	expect( r1 ).toEqual( tn.t1 )
	t1.addChild( tn.t2 )
	let t2 = t1.getSubTreeById( 2 )
	expect( t2!.root ).toEqual( tn.t2 )
	
	t2!.addChild( tn.t3 )
	t2!.addChild( tn.t4 )
	let t5 = t2!.addChild( tn.t5 );
	t5.addChild( tn.t6 )
	t5.addChild( tn.t7 )

	let t3 = t5.getSubTreeById( 3 );
	let r3 = t5.getRootById( 3 );
	expect( t3 ).toBeUndefined();
	expect( r3 ).toBeUndefined();
	
	t3 = t1.getSubTreeById(3);
	expect( t3!.root ).toEqual( tn.t3 )
	t3 = t2!.getSubTreeById(3);
	r3 = t2!.getRootById( 3 );
	expect( t3!.root ).toEqual( tn.t3 )
	expect( r3 ).toEqual( tn.t3 )

})