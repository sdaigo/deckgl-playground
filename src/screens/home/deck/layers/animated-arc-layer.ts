import { ArcLayer } from 'deck.gl'

const vsDeclaration = `
attribute float instanceFrequency;
varying float vArcLength;
varying float vFrequency;`

const vsMain = `
vArcLength = distance(source, target);
vFrequency = instanceFrequency;
`

const fsDeclaration = `
uniform float tailLength;
uniform float timestamp;
uniform float animationSpeed;

varying float vArcLength;
varying float vFrequency;`

const fsColorFilter = `
float tripDuration = vArcLength / animationSpeed;
float flightInterval = 1.0 / vFrequency;
float r = mod(geometry.uv.x, flightInterval);

// Head of the trip (alpha = 1.0)
float rMax = mod(fract(timestamp / tripDuration), flightInterval);
// Tail of the trip (alpha = 0.0)
float rMin = rMax - tailLength / vArcLength;
// Two consecutive trips can overlap
float alpha = (r > rMax ? 0.0 : smoothstep(rMin, rMax, r)) + smoothstep(rMin + flightInterval, rMax + flightInterval, r);
if (alpha == 0.0) {
  discard;
}
color.a *= alpha;
`

export default class AnimatedArcLayer extends ArcLayer<any, any> {
  getShaders() {
    const shaders = super.getShaders()
    shaders.inject = {
      'vs:#decl': vsDeclaration,
      'vs:#main-end': vsMain,
      'fs:#decl': fsDeclaration,
      'fs:DECKGL_FILTER_COLOR': fsColorFilter,
    }
    return shaders
  }

  initializeState(params: any) {
    super.initializeState(params)

    this.getAttributeManager().addInstanced({
      instanceFrequency: {
        size: 1,
        accessor: 'getFrequency',
        defaultValue: 1,
      },
    })
  }

  draw(opts: any) {
    this.state.model.setUniforms({
      tailLength: this.props.tailLength,
      animationSpeed: this.props.animationSpeed,
      timestamp: (Date.now() / 1000) % 86400,
    })
    super.draw(opts)

    // By default, the needsRedraw flag is cleared at each render. We want the layer to continue
    // refreshing.
    this.setNeedsRedraw()
  }
}
AnimatedArcLayer.layerName = 'AnimatedArcLayer'
AnimatedArcLayer.defaultProps = {
  getFrequency: { type: 'accessor', value: 1 },
  // Speed of the running light
  animationSpeed: { type: 'number', min: 0, value: 3 },
  // Size of the blob
  tailLength: { type: 'number', min: 0, value: 20 },
}
