

type I = number | string;

interface INodeWithID /*extends Object*/ {
	id: I
}

export interface ITreeRoots<T> {
	root: T,
	children: ITreeRoots<T>[];
}

export interface ITreeIds<I> {
	root: I,
	children: ITreeRoots<I>[];
}

export default class Tree<T extends INodeWithID> {
	private _root: T;
	private _father: Tree<T> | undefined = undefined;
	private _children : Map<I,Tree<T>> = new Map<I,Tree<T>>();

	constructor(t: T) {
		this._root = t;
	}

	private setFather(father?: Tree<T>) { this._father = father; }

	get root() { return this._root }
	
	get children(): Array<T> {
		let out: T[] = [];
		this._children.forEach( (val: Tree<T>) => { 
			out.push( val._root ) 
		})
		return out;
	}
	get childrenTrees(): Array<Tree<T>> {
		let out: Tree<T>[] = [];
		this._children.forEach( (val: Tree<T>) => { 
			out.push( val ) 
		})
		return out;
	}
	get fatherTree(): Tree<T> | undefined { return this._father }

	get father(): T | undefined { return this._father && this._father.root}

	get ancients(): Array<T> {
		let out: T[] = [];
		if ( this._father !== undefined ) {
			out = [...this._father.ancients, this._father._root];
		}
		return out;
	}

	get brothers(): Array<T> {
		let out: T[] = [];
		if ( this._father !== undefined ) {
			out = this._father.children;
			out = out.filter( (t: T) => this._root.id !== t.id );
		}
		return out;
	}

	getTreeIds(): ITreeIds<I> {
		let a: ITreeIds<I>[] = [];
		this._children.forEach( (e: Tree<T>) => {
			a.push( e.getTreeIds() )
		} )
		return {
			root: this._root.id,
			children: a,
		}
	}
	
	getTreeRoots(): ITreeRoots<T> {
		let a: ITreeRoots<T>[] = [];
		this._children.forEach( (e: Tree<T>) => {
			a.push( e.getTreeRoots() )
		} )
		return {
			root: this._root,
			children: a,
		}
	}
	
	addChild(n: T): Tree<T> {
		if (n.id === this._root.id) {
			throw new Error(`Exist a child with id: ${n.id}`)
		}
		let tree = new Tree<T>(n);
		tree.setFather( this );
		this._children.set( n.id, tree )
		return tree
	}

	removeChild(id: I): T | undefined {
		let out: T | undefined = undefined;
		if (this._children.has(id)) {
			this._children.delete(id);
		}
		return out;
	}

	getSubTreeById(id: I): Tree<T> | undefined {
		let out: Tree<T> | undefined = undefined;
		if ( this._root.id === id ) {
			out = this
		} else {
			// TODO: usar un while			
			this._children.forEach( (v: Tree<T>) => {
				const t = v.getSubTreeById(id)
				if (!!t) out = t;
			} )
		}
		return out;
	}

	getRootById(id: I): T | undefined {
		const tree = this.getSubTreeById( id );
		return tree && tree._root;
	}

	forEach(callback: (t: T, i: I, tree: Tree<T>) => void): void {
		callback( this._root, this._root.id, this );
		this._children.forEach( (v: Tree<T>) => {
			v.forEach( callback )
		} )
	}
}