export interface BaseColumn {
  label: string
  field: string
  sortable?: boolean
  thClass?: string
  tdClass?: string
  hidden?: boolean
  globalSearchDisabled?: boolean
}
