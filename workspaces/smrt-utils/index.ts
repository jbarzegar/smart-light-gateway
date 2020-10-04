type UpdateElementParams<Item> = {
  in: Item[];
  where: (item: Item, index: number) => boolean;
  setter: (item: Item) => Item;
};
/** Update a element in an array
 *
 * @usage
 * ```
 *   const arr = [1, 2, 3]
 *   const updatedArr = updateElement<number>({
 *     in: arr,
 *     where: x => x === 3,
 *     set: n => n + 3
 *     // or use bare value;
 *     set: 6
 *   })
 * ```
 */
export const updateElement = <Item>(_: UpdateElementParams<Item>): Item[] => {
  const copy = [..._.in];
  const index = copy.findIndex(_.where);

  if (!copy[index]) {
    console.error(`updateElement bailed early, item could not be found`);
    return copy;
  }

  copy[index] = _.setter(copy[index]);

  return copy;
};
