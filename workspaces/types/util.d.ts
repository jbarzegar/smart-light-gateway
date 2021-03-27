export type ID = string

export type PrimitiveObject<
  V = any,
  K extends string | number = string | number
> = {
  [Key in K]: V
}
