

export interface ItemListProps{
    found : Array<{
        id: number;
        item:string;
        location: string;
        description:string;
        slug:string;
        createdAt:Date;
        client: {
            name :string;
        };
    }>
}

export interface ItemCardProps{
    item : {
        id: number;
        item:string;
        location: string;
        description:string;
        slug:string;
        createdAt:Date;
        client: {
            name :string;
        };
    }
}

export interface ItemContentProps{
    item : {
        id: number;
        item:string;
        location: string;
        description:string;
        slug:string;
        createdAt:Date;
        updatedAt : Date;
        client: {
            name :string;
        };
    };
    isClient : boolean;
}
