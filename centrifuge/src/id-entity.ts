import {IdEntity, IdMap} from './types/id-entity-def'

export function toMap<TypeEntity extends IdEntity>(list: TypeEntity[]): IdMap<TypeEntity>
{
  const ret: IdMap<TypeEntity> = {}
  for(const entity of list)
  {
    ret[entity.id] = entity
  }
  return ret
}
