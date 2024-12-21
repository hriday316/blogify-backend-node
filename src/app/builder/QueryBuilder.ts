import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // for query search
  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }
  // for query filter
  filter() {
    const filterQuery = this?.query?.filter;
    if (filterQuery) {
      this.modelQuery = this.modelQuery
        .find({ author: filterQuery })
        .populate('author');
    }
    return this;
  }

  // for sorting
  sort() {
    const sortBy = (this?.query?.sortBy as string)?.split(',')?.join(' ');
    const sortOrder = this?.query?.sortOrder === 'asc' ? '' : '-';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    return this;
  }
}

export default QueryBuilder;
