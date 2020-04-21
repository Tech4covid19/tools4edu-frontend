export interface IFilters {
  filterFields: IFilterField[],
  loading: boolean,
  errors: any
}

export interface IFilterField {
  name: string,
  value: string,
  selected?: boolean
}
