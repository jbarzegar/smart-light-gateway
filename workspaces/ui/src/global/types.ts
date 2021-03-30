import {
  CaseReducer,
  EntityState,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit'

export type FnEntityReducer<Entity, Payload> = CaseReducer<
  EntityState<Entity>,
  PayloadAction<Payload>
>

export type EntityReducers<Entity> = SliceCaseReducers<EntityState<Entity>>
