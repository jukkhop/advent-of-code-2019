/* eslint-disable no-unused-vars */

import { range, sum } from 'ramda'
import tmpl from 'reverse-string-template'

export interface Moon {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

function main(inputs: string[]) {
  const moons: Moon[] = inputs.map(toMoon)

  const xs = moons.map(m => m.x)
  const ys = moons.map(m => m.y)
  const zs = moons.map(m => m.z)
  const vxs = moons.map(m => m.vx)
  const vys = moons.map(m => m.vy)
  const vzs = moons.map(m => m.vz)

  for (const _ of range(0, 1000)) {
    // Apply gravity
    for (let i = 0; i < moons.length; i += 1) {
      vxs[i] += increment(xs, xs[i])
      vys[i] += increment(ys, ys[i])
      vzs[i] += increment(zs, zs[i])
    }
    // Apply velocity
    for (let i = 0; i < moons.length; i += 1) {
      xs[i] += vxs[i]
      ys[i] += vys[i]
      zs[i] += vzs[i]
    }
  }

  const energies = moons.map((_, i) => {
    const pot = Math.abs(xs[i]) + Math.abs(ys[i]) + Math.abs(zs[i])
    const kin = Math.abs(vxs[i]) + Math.abs(vys[i]) + Math.abs(vzs[i])
    return pot * kin
  })

  return sum(energies)
}

function toMoon(str: string): Moon {
  const moon = tmpl(
    str.replace(/ /g, ''), //
    '<x=`x`,y=`y`,z=`z`>',
    { delimiters: ['`', '`'] }
  )
  return {
    x: Number(moon.x),
    y: Number(moon.y),
    z: Number(moon.z),
    vx: 0,
    vy: 0,
    vz: 0
  }
}

function increment(data: number[], n: number) {
  let acc = 0

  for (let i = 0; i < data.length; i += 1) {
    if (data[i] < n) {
      acc -= 1
    }

    if (data[i] > n) {
      acc += 1
    }
  }

  return acc
}

export default main

export { toMoon, increment }
