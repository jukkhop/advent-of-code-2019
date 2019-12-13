/* eslint-disable no-unused-vars */

import { lcm } from 'mathjs'
import { equals, identity } from 'ramda'
import { Moon, toMoon, increment } from './part1'

function main(inputs: string[]) {
  const moons: Moon[] = inputs.map(toMoon)
  const len = moons.length

  const xs = moons.map(m => m.x)
  const ys = moons.map(m => m.y)
  const zs = moons.map(m => m.z)
  const vxs = moons.map(m => m.vx)
  const vys = moons.map(m => m.vy)
  const vzs = moons.map(m => m.vz)

  const oxs = xs.map(identity)
  const oys = ys.map(identity)
  const ozs = zs.map(identity)
  const ovxs = vxs.map(identity)
  const ovys = vys.map(identity)
  const ovzs = vzs.map(identity)

  let cycleX: number | undefined
  let cycleY: number | undefined
  let cycleZ: number | undefined

  let step = 0

  for (;;) {
    // Apply gravity
    for (let i = 0; i < len; i += 1) {
      vxs[i] += increment(xs, xs[i])
      vys[i] += increment(ys, ys[i])
      vzs[i] += increment(zs, zs[i])
    }
    // Apply velocity
    for (let i = 0; i < len; i += 1) {
      xs[i] += vxs[i]
      ys[i] += vys[i]
      zs[i] += vzs[i]
    }

    step += 1

    if (!cycleX && equals(oxs, xs) && equals(ovxs, vxs)) {
      cycleX = step
    }

    if (!cycleY && equals(oys, ys) && equals(ovys, vys)) {
      cycleY = step
    }

    if (!cycleZ && equals(ozs, zs) && equals(ovzs, vzs)) {
      cycleZ = step
    }

    if (cycleX && cycleY && cycleZ) {
      break
    }
  }

  // @ts-ignore
  return lcm(cycleX, cycleY, cycleZ)
}

export default main
