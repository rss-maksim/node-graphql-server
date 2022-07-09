export class EntityResponseTransformer {
    transformEntityResponse<T = any>(entity: T): Omit<T, '_id'> & { id: string } {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { _id: id, ...rest } = entity;
        return { id, ...rest };
    }

    transformListEntitiesResponse<T = any>(entities: T[]) {
        return entities.map(this.transformEntityResponse<T>);
    }
}
