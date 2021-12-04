<template>
	<div>
		<div ref="pretag"></div>
		<canvas ref="canvasdonut" height="1000" width="1200"></canvas>
	</div>
</template>

<script>
/* eslint-disable no-bitwise */
// Converted from native javascript example: https://www.a1k0n.net/2011/07/20/donut-math.html
let A = 1
let B = 1

export default {
	name: 'RotatingExperiment',
	props: {
		msg: String
	},
	mounted() {
		this.pretag = this.$refs.pretag
		this.canvastag = this.$refs.canvasdonut
		this.tmr1 = undefined
		this.tmr2 = undefined
		A = 1
		B = 1

		// this.animateAsciiFrame()

		this.canvasSetup()
		this.animateCanvasFrame()
	},
	methods: {
		animateAsciiFrame: function animateAsciiFrame() {
			const self = this

			if (self.tmr1 === undefined) {
				self.tmr1 = setInterval(self.asciiFrame, 200)
			} else {
				clearInterval(self.tmr1)
				self.tmr1 = undefined
			}
		},
		animateCanvasFrame: function animateCanvasFrame() {
			const self = this
			if (this.tmr2 === undefined) {
				this.tmr2 = setInterval(self.canvasframe, 50)
			} else {
				clearInterval(this.tmr2)
				this.tmr2 = undefined
			}
			// self.canvasframe()
		},
		asciiFrame: function asciiFrame() {
			const self = this
			const b = []
			const z = []
			A += 0.07
			B += 0.03
			const cA = Math.cos(A)
			const sA = Math.sin(A)
			const cB = Math.cos(B)
			const sB = Math.sin(B)
			for (let k = 0; k < 1760; k += 1) {
				b[k] = k % 80 === 79 ? '\n' : ' '
				z[k] = 0
			}
			for (let j = 0; j < 6.28; j += 0.07) {
				// j <=> theta
				const ct = Math.cos(j)
				const st = Math.sin(j)
				for (let i = 0; i < 6.28; i += 0.02) {
					// i <=> phi
					const sp = Math.sin(i)
					const cp = Math.cos(i)
					const h = ct + 2 // R1 + R2*cos(theta)
					const D = 1 / (sp * h * sA + st * cA + 5) // this is 1/z
					const t = sp * h * cA - st * sA // this is a clever factoring of some of the terms in x' and y'

					const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB))
					const y = 0 | (12 + 15 * D * (cp * h * sB + t * cB))
					const o = x + 80 * y
					const N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB))
					if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
						z[o] = D
						b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0]
					}
				}
			}
			self.pretag.innerHTML = b.join('')
		},
		canvasSetup: function canvasSetup() {
			const self = this
			const R1 = 1
			const R2 = 2
			const K1 = 500
			const K2 = 5
			self.canvasframe = function canvasframe() {
				const ctx = self.canvastag.getContext('2d')
				ctx.fillStyle = 'black'
				ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

				if (self.tmr1 === undefined) {
					// only update A and B if the first animation isn't doing it already
					A += 0.07
					B += 0.03
				}
				// precompute cosines and sines of A, B, theta, phi, same as before
				const cA = Math.cos(A)
				const sA = Math.sin(A)
				const cB = Math.cos(B)
				const sB = Math.sin(B)

				for (let j = 0; j < 6.28; j += 0.15) {
					// j <=> theta
					const ct = Math.cos(j)
					const st = Math.sin(j) // cosine theta, sine theta
					for (let i = 0; i < 6.28; i += 0.1) {
						// i <=> phi
						const sp = Math.sin(i)
						const cp = Math.cos(i) // cosine phi, sine phi
						const ox = R2 + R1 * ct // object x, y = (R2,0,0) + (R1 cos theta, R1 sin theta, 0)
						const oy = R1 * st

						const x = ox * (cB * cp + sA * sB * sp) - oy * cA * sB // final 3D x coordinate
						const y = ox * (sB * cp - sA * cB * sp) + oy * cA * cB // final 3D y
						const ooz = 1 / (K2 + cA * ox * sp + sA * oy) // one over z
						const xp = K1 + K1 * ooz * x // x' = screen space coordinate, translated and scaled to fit our 320x240 canvas element
						const yp = K1 - K1 * ooz * y // y' (it's negative here because in our output, positive y goes down but in our 3D space, positive y goes up)
						// luminance, scaled back to 0 to 1
						const L = 0.8 * (cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp))

						if (L > 0) {
							ctx.fillStyle = `rgba(105,255,71,${L})`
							ctx.fillRect(xp, yp, 10, 10)
						}
					}
				}
			}
		}
	}
}
</script>
