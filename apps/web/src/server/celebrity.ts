import { createServerFn } from '@tanstack/react-start'
import * as celebrity from '@jameen/api/celebrity'
import { getDb } from './db'

export const listCelebrities = createServerFn({ method: 'GET' }).handler(() =>
  celebrity.listCelebrities(getDb()),
)
