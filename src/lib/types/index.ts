

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