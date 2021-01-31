export type ID = string | number

export type PrimitiveObject<
  V = any,
  K extends string | number = string | number
> = {
  [Key in K]: V
}
