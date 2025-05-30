export namespace data {
	
	export class User {
	    id: number;
	    name: string;
	    email: string;
	    is_admin: boolean;
	    created_at: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.email = source["email"];
	        this.is_admin = source["is_admin"];
	        this.created_at = source["created_at"];
	    }
	}

}

