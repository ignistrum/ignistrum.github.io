<script setup lang="ts">
import sky from '~/assets/images/portal/sky.png'
import particles from '~/assets/images/portal/particles.png'

const resources: string[] = [sky, particles]

const props = defineProps({
  layout: {
    default: '#ender-app',
    type: String,
  },
  directory: {
    default: '/images/portal',
    type: String,
  },
  create: Boolean,
  animate: Boolean,
  randomize: Boolean,
  fade: Boolean,
  speed: {
    default: 1,
    type: Number,
  },
})

class Canvas {
  element: HTMLCanvasElement

  constructor(create: boolean = true, transparent: boolean = false) {
    this.element = create ? this.create() : this.query()

    if (transparent) this.element.style.opacity = '0'

    this.fill()
  }

  create(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    canvas.style.display = 'block'
    canvas.style.position = 'fixed'
    canvas.style.bottom = '0'
    canvas.style.left = '0'
    canvas.style.zIndex = '-1'
    canvas.style.transition = 'all 0.69420s ease-in'

    canvas.innerHTML =
      '<span>Your browser does not support the &lt;canvas /&gt; element, which is required for parallax animation.</span>'

    // Add a class for subclassing support.
    canvas.classList.add('ecmaportal')
    canvas.id = 'ecmaportal'

    document.body.appendChild(canvas)

    return canvas
  }

  compatible(
    obj: HTMLCanvasElement | HTMLElement | Element,
  ): obj is HTMLCanvasElement {
    return obj.tagName === 'CANVAS'
  }

  query(): HTMLCanvasElement {
    const canvas = document.querySelector('#ecmaportal')

    if (!canvas) throw new Error('ECMAPortal canvas not found.')
    if (!this.compatible(canvas))
      throw new Error('The ECMAPortal element is not a canvas.')

    return canvas
  }

  fadeIn() {
    this.element.style.opacity = '1'
  }

  fadeOut() {
    this.element.style.opacity = '0'
  }

  fill() {
    this.element.width = window.innerWidth * window.devicePixelRatio
    this.element.height = window.innerHeight * window.devicePixelRatio
  }

  full(): boolean {
    return (
      this.element.width === window.innerWidth &&
      this.element.height === window.innerHeight
    )
  }

  destroy() {
    this.element.remove()
  }
}

class Portal {
  private readonly version: string = '1.4T'
  private readonly canvas: Canvas
  private readonly prog?: WebGLProgram | null
  private readonly gl: WebGL2RenderingContext | null

  private animate: boolean = false
  private readonly randomize: boolean = false
  private speed: number = 1
  private readonly initialSpeed: number = 1
  private readonly dv = 20

  // It's integral for the animation to tie it to the current time, else it will be tied to the framerate.
  private currentTime: number = Date.now()
  private pauseTime: number = 0
  private clickTime: number = 0

  private tick: number = 0
  private dt: number = 6 / 1000000

  private promises: Promise<HTMLImageElement>[] = []
  private uniforms!: {
    modelViewMatrix: WebGLUniformLocation
    projectionMatrix: WebGLUniformLocation
    dt: WebGLUniformLocation
    resolution: WebGLUniformLocation
    sky: WebGLUniformLocation
    particles: WebGLUniformLocation
  }

  constructor(
    directory: string = '/',
    create: boolean = true,
    animate: boolean = true,
    randomize: boolean = false,
    fade: boolean = false,
    speed: number = 1,
  ) {
    // Vertex shader.
    const vglsl = `#version 300 es

		layout (location = 0) in vec3 Position;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		uniform vec2 canvasResolution;

		vec4 projection_from_position(vec4 position) {
			vec4 projection = position * 0.5;
			projection.xy = vec2(projection.x + projection.w, projection.y + projection.w);
			projection.zw = position.zw;
			return projection;
		}

		out vec4 texProj0;

		void main() {
			gl_Position = projectionMatrix * modelViewMatrix * vec4(Position, 1.0);

			texProj0 = projection_from_position(gl_Position);
			texProj0 = vec4(texProj0.xy * canvasResolution / max(canvasResolution.x, canvasResolution.y), texProj0.zw);
		}`

    // Fragment shader.
    const fglsl = `#version 300 es

		precision highp float;

		uniform sampler2D sky;
		uniform sampler2D particles;
		uniform float dt;

		in vec4 texProj0;

		const int LAYERS = 15;
		const vec3 COLORS[] = vec3[](
			vec3(0.022087, 0.098399, 0.110818),
			vec3(0.011892, 0.095924, 0.089485),
			vec3(0.027636, 0.101689, 0.100326),
			vec3(0.046564, 0.109883, 0.114838),
			vec3(0.064901, 0.117696, 0.097189),
			vec3(0.063761, 0.086895, 0.123646),
			vec3(0.084817, 0.111994, 0.166380),
			vec3(0.097489, 0.154120, 0.091064),
			vec3(0.106152, 0.131144, 0.195191),
			vec3(0.097721, 0.110188, 0.187229),
			vec3(0.133516, 0.138278, 0.148582),
			vec3(0.070006, 0.243332, 0.235792),
			vec3(0.196766, 0.142899, 0.214696),
			vec3(0.047281, 0.315338, 0.321970),
			vec3(0.204675, 0.390010, 0.302066),
			vec3(0.080955, 0.314821, 0.661491)
		);

		const mat4 SCALE_TRANSLATE = mat4(
			0.5, 0.0, 0.0, 0.25,
			0.0, 0.5, 0.0, 0.25,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		);

		mat2 mat2_rotate_z(float radians) {
			return mat2(
				cos(radians), -sin(radians),
				sin(radians), cos(radians)
			);
		}

		mat4 portal_layer(float layer) {
			mat4 translate = mat4(
				1.0, 0.0, 0.0, 17.0 / layer,
				0.0, 1.0, 0.0, (2.0 + layer / 1.5) * (dt * 1.5),
				0.0, 0.0, 1.0, 0.0,
				0.0, 0.0, 0.0, 1.0
			);

			mat2 rotate = mat2_rotate_z(radians((layer * layer * 4321.0 + layer * 9.0) * 2.0));

			mat2 scale = mat2((4.5 - layer / 4.0) * 2.0);

			return mat4(scale * rotate) * translate * SCALE_TRANSLATE;
		}

		out vec4 fragColor;

		void main() {
			vec3 color = textureProj(sky, texProj0).rgb * COLORS[0];

			for (int i = 0; i < LAYERS; i++) {
				color += textureProj(particles, texProj0 * portal_layer(float(i + 1))).rgb * COLORS[i];
			}

			fragColor = vec4(color, 1.0);
		}`

    // Make sure the resource directory ends with a slash.
    if (directory.at(-1) !== '/') directory += '/'

    // Images to load.
    const images = resources // [`${directory}sky.png`, `${directory}particles.png`]

    // Notice.
    this.notice()

    // Set initial property values.
    this.animate = animate
    this.randomize = randomize

    // Set default speed.
    this.speed = speed
    this.initialSpeed = this.speed
    this.dv = 20

    // Create a canvas and acquire its context.
    this.canvas = new Canvas(create, fade)
    this.gl = this.canvas.element.getContext('webgl2')

    // If WebGL isn't part of available features, fail.
    if (!this.gl) {
      this.canvas.destroy()

      alert(
        'Unable to initialize WebGL 2.\nThe website will lack parallax animation.',
      )
      console.error(
        'Unable to initialize WebGL 2. Your browser or machine may not support it.',
      )

      return
    }

    // Get current tick and slightly randomize it if animation is enabled.
    this.tick = Number(this.animate && this.randomize) * this.randomRange(0, 10)

    // Build shaders.
    this.prog = this.build(vglsl, fglsl)

    if (!this.prog) {
      this.canvas.destroy()

      alert(
        'Failed to compile WebGL 2 shaders.\nOpen the developer console for debug output.',
      )

      return
    }

    // Add an event listener to the canvas if animation is enabled.
    if (this.animate) this.canvas.element.onclick = this.click.bind(this)

    // Bind class context to the resize handler, pass it to the event bus.
    window.addEventListener('resize', this.resize.bind(this))

    // Create image loading promises.
    this.promises = images.map((image) => this.loadImage(image))

    // Initialize the scene.
    this.initialize()

    // Once all promises have been fulfilled, build the scene.
    Promise.all(this.promises).then((resources) => {
      // Load resources.
      resources.forEach((image, index) => this.loadResource(image, index))

      // Bind program
      this.gl!.useProgram(this.prog!)

      // Begin render.
      this.render()
      if (fade) this.canvas.fadeIn()
    })
  }

  notice() {
    console.log(
      `%c \u2587%c\u2587%c\u2587  %c\u2587%c\u2587%c\u2587 %c // ECMAPortal v${this.version} by Endermanch & WiPet\n\n\thttps://enderman.ch\n\thttps://go.enderman.ch/wipet`,
      'color: #E58EFF',
      'color: #D52DFF',
      'color: #E58EFF',
      'color: #E58EFF',
      'color: #D52DFF',
      'color: #E58EFF',
      'color: #008000',
    )

    console.log(
      'If any errors occur below, please send a screenshot of them my way!\n\t%ccontact@enderman.ch',
      'color: #87CEFA',
    )
  }

  randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  build(vshSource: string, fshSource: string): WebGLProgram | null {
    const vsh = this.gl!.createShader(this.gl!.VERTEX_SHADER)

    this.gl!.shaderSource(vsh!, vshSource)
    this.gl!.compileShader(vsh!)

    if (!this.gl!.getShaderParameter(vsh!, this.gl!.COMPILE_STATUS)) {
      console.error(this.gl!.getShaderInfoLog(vsh!))
      return null
    }

    const fsh = this.gl!.createShader(this.gl!.FRAGMENT_SHADER)

    this.gl!.shaderSource(fsh!, fshSource)
    this.gl!.compileShader(fsh!)

    if (!this.gl!.getShaderParameter(fsh!, this.gl!.COMPILE_STATUS)) {
      console.error(this.gl!.getShaderInfoLog(fsh!))
      return null
    }

    const program: WebGLProgram = this.gl!.createProgram()!

    this.gl!.attachShader(program, vsh!)
    this.gl!.attachShader(program, fsh!)

    this.gl!.linkProgram(program)

    if (!this.gl!.getProgramParameter(program, this.gl!.LINK_STATUS)) {
      console.error(this.gl!.getProgramInfoLog(program))
      return null
    }

    return program
  }

  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  loadResource(image: HTMLImageElement, index: number) {
    const samplerParameters = [this.gl!.CLAMP_TO_EDGE, this.gl!.MIRRORED_REPEAT]

    const sampler = this.gl!.createSampler()!

    this.gl!.samplerParameteri(
      sampler,
      this.gl!.TEXTURE_WRAP_S,
      samplerParameters[index],
    )
    this.gl!.samplerParameteri(
      sampler,
      this.gl!.TEXTURE_WRAP_T,
      samplerParameters[index],
    )
    this.gl!.samplerParameteri(
      sampler,
      this.gl!.TEXTURE_WRAP_R,
      samplerParameters[index],
    )

    this.gl!.samplerParameteri(
      sampler,
      this.gl!.TEXTURE_MIN_FILTER,
      this.gl!.NEAREST_MIPMAP_LINEAR,
    )
    this.gl!.samplerParameteri(
      sampler,
      this.gl!.TEXTURE_MAG_FILTER,
      this.gl!.NEAREST,
    )

    this.gl!.bindSampler(index, sampler)

    const texture = this.gl!.createTexture()

    this.gl!.activeTexture(this.gl!.TEXTURE0 + index)
    this.gl!.bindTexture(this.gl!.TEXTURE_2D, texture)

    this.gl!.texImage2D(
      this.gl!.TEXTURE_2D,
      0,
      this.gl!.RGBA,
      this.gl!.RGBA,
      this.gl!.UNSIGNED_BYTE,
      image,
    )
    this.gl!.generateMipmap(this.gl!.TEXTURE_2D)
  }

  initialize() {
    this.uniforms = {
      modelViewMatrix: this.gl!.getUniformLocation(
        this.prog!,
        'modelViewMatrix',
      )!,
      projectionMatrix: this.gl!.getUniformLocation(
        this.prog!,
        'projectionMatrix',
      )!,
      dt: this.gl!.getUniformLocation(this.prog!, 'dt')!,
      resolution: this.gl!.getUniformLocation(this.prog!, 'canvasResolution')!,
      sky: this.gl!.getUniformLocation(this.prog!, 'sky')!,
      particles: this.gl!.getUniformLocation(this.prog!, 'particles')!,
    }

    const vertexPosBuffer = this.gl!.createBuffer()
    const positions = new Float32Array([
      -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
    ])

    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, vertexPosBuffer)
    this.gl!.bufferData(this.gl!.ARRAY_BUFFER, positions, this.gl!.STATIC_DRAW)
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, null)

    const vertexTexBuffer = this.gl!.createBuffer()
    const texCoords = new Float32Array([
      0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
    ])

    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, vertexTexBuffer)
    this.gl!.bufferData(this.gl!.ARRAY_BUFFER, texCoords, this.gl!.STATIC_DRAW)
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, null)

    const vertexPosLocation = 0

    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, vertexPosBuffer)
    this.gl!.vertexAttribPointer(
      vertexPosLocation,
      2,
      this.gl!.FLOAT,
      false,
      0,
      0,
    )
    this.gl!.enableVertexAttribArray(vertexPosLocation)
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, null)

    const vertexTexLocation = 4

    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, vertexTexBuffer)
    this.gl!.vertexAttribPointer(
      vertexTexLocation,
      2,
      this.gl!.FLOAT,
      false,
      0,
      0,
    )
    this.gl!.enableVertexAttribArray(vertexTexLocation)
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, null)
  }

  scene() {
    const identityMatrix = new Float32Array([
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
      1.0,
    ])

    if (this.animate) {
      // Speed up the animation if the user has clicked.
      if (this.clickTime !== 0) {
        this.speed =
          this.dv * this.initialSpeed -
          Math.min(
            ((Date.now() - this.clickTime) / 100) * this.initialSpeed,
            (this.dv - 1) * this.initialSpeed,
          )
        if (this.speed === this.initialSpeed) this.clickTime = 0
      }

      // R(t) = t + dt (mod 20)
      this.tick += this.dt
      this.tick %= 20
    }

    this.gl!.uniformMatrix4fv(
      this.uniforms.modelViewMatrix,
      false,
      identityMatrix,
    )
    this.gl!.uniformMatrix4fv(
      this.uniforms.projectionMatrix,
      false,
      identityMatrix,
    )

    this.gl!.uniform2f(
      this.uniforms.resolution,
      this.canvas.element.width,
      this.canvas.element.height,
    )

    this.gl!.uniform1f(this.uniforms.dt, this.tick)
    this.gl!.uniform1i(this.uniforms.sky, 0)
    this.gl!.uniform1i(this.uniforms.particles, 1)

    this.gl!.drawArraysInstanced(this.gl!.TRIANGLES, 0, 6, 1)
  }

  render() {
    // Make sure the viewport matches the size of the canvas' drawingBuffer.
    this.gl!.viewport(
      0,
      0,
      this.gl!.drawingBufferWidth,
      this.gl!.drawingBufferHeight,
    )

    // Calculate the delta time.
    this.dt = ((Date.now() - this.currentTime) * this.speed) / 1000000
    this.currentTime = Date.now()

    // Run the scene.
    this.scene()

    // Request the next animation frame if animation is enabled.
    if (this.animate) requestAnimationFrame(this.render.bind(this))
  }

  resize() {
    if (!this.canvas.full()) this.canvas.fill()

    // If we have animation disabled, we still have to re-render the scene once on resize.
    if (!this.animate) requestAnimationFrame(this.render.bind(this))
  }

  click() {
    this.clickTime = Date.now()
  }

  continue() {
    if (this.pauseTime === 0) return

    // Add the time that has passed since the pause to the current time.
    this.currentTime += Date.now() - this.pauseTime
    this.pauseTime = 0
    this.animate = true

    this.render()
  }

  pause() {
    if (this.pauseTime !== 0) return

    // Save the pause time to calculate the delta time.
    this.pauseTime = Date.now()
    this.animate = false
  }

  destroy() {
    // Doesn't need to be called usually, the garbage collector should do its job.
    // The method isn't implemented, but the pseudocode is as follows:

    // this.gl!.deleteBuffer(vertexPosBuffer);
    // this.gl!.deleteBuffer(vertexTexBuffer);

    // this.gl!.deleteSampler(sampler);
    // this.gl!.deleteTexture(texture);

    this.gl!.deleteProgram(this.prog!)
  }
}

onMounted(() => {
  const layout = document.querySelector(props.layout)
  const portal = new Portal(
    props.directory,
    props.create,
    props.animate,
    props.randomize,
    props.fade,
    props.speed,
  )

  layout!.addEventListener('mousedown', ((e: UIEvent) => {
    if (e.target === e.currentTarget && e.detail >= 2) {
      e.preventDefault()
      portal.click()
    }
  }) as EventListener)
})
</script>

<template>
  <canvas id="ecmaportal" class="parallax">
    <span>
      Your browser does not support the &lt;canvas /&gt; element, which is
      required for parallax animation.
    </span>
  </canvas>
</template>

<style scoped>
.parallax {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  transition: all 0.6942s ease-in;

  z-index: -1;
}
</style>
