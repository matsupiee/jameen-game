#!/usr/bin/env node
import * as fs from 'fs'

const csvPath = '/Users/hiromu/Downloads/celebrity_face_image_urls_filled.csv'
const csvData = fs.readFileSync(csvPath, 'utf-8')
const lines = csvData.trim().split('\n').slice(1)

console.log(`Total lines: ${lines.length}`)
console.log('\nFirst 3 lines:')
for (let i = 0; i < 3; i++) {
  console.log(`Line ${i + 1}: ${lines[i].substring(0, 100)}...`)
}

console.log('\nTesting with split approach...')
for (let i = 0; i < 3; i++) {
  const parts = lines[i].split(',', 2)
  console.log(`Line ${i + 1}:`)
  console.log(`  Name: ${parts[0]}`)
  console.log(`  Rest: ${parts[1]?.substring(0, 50)}...`)
}

console.log('\nTesting regex with greedy match...')
const pattern = /^(.+?),(.+?),.+?,.+$/
for (let i = 0; i < 3; i++) {
  const match = lines[i].match(pattern)
  console.log(`Line ${i + 1} match: ${match ? 'YES' : 'NO'}`)
  if (match) {
    console.log(`  Name: ${match[1]}`)
    console.log(`  URL: ${match[2].substring(0, 50)}...`)
  }
}
