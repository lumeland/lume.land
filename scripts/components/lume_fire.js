/**
 * All this code was adapted from:
 * https://github.com/ethanhjennings/webgl-fire-particles
 */

const options = {
  fireEmitPositionSpread: { x: 100, y: 20 },
  fireEmitRate: 1600,
  fireSize: 40.0,
  fireSizeVariance: 100.0,
  fireEmitAngleVariance: 0.1,
  fireSpeed: 100.0,
  fireSpeedVariance: 80.0,
  fireDeathSpeed: 0.006,
  fireTriangleness: 0.0001,
  windStrength: 8.0,
  windTurbulance: 0.0003,
  sparks: true,
  sparkEmitRate: 6.0,
  sparkSize: 10.0,
  sparkSizeVariance: 20.0,
  sparkSpeed: 200.0,
  sparkSpeedVariance: 80.0,
  sparkDeathSpeed: 0.0085,
};

function start(canvas) {
  const gl = canvas.getContext("webgl");
  const texture = gl.createTexture();
  const { width, height } = canvas;

  // Load the image texture
  const image = new Image();

  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_NEAREST,
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };

  image.src = "img/gradient.png";

  // Initialize textures
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([255, 0, 0, 255]),
  );

  const vertexBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  const squareTextureCoordinateVertices = gl.createBuffer();

  // setup GLSL program
  const vertexShader = loadShader(
    gl,
    `
    attribute vec2 a_position;
    attribute vec4 a_color;
    attribute vec2 a_texture_coord;
    varying vec4 v_color;
    varying vec2 v_texture_coord;

    uniform vec2 u_resolution;

    void main() {
      vec2 clipSpace = (a_position/u_resolution)*2.0-1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      v_color = a_color;
      v_texture_coord = a_texture_coord;
    }
    `,
    gl.VERTEX_SHADER,
  );
  const fragmentShader = loadShader(
    gl,
    `
    precision mediump float;

    varying vec4 v_color;
    varying highp vec2 v_texture_coord;

    uniform sampler2D u_sampler;

    void main() {
      vec2 uv = gl_FragCoord.xy/vec2(800,600);
      vec4 texColor = texture2D(u_sampler,v_texture_coord.xy);

      vec4 finalColor;
      finalColor.r = texColor.r*v_color.r;
      finalColor.g = texColor.g*v_color.g;
      finalColor.b = texColor.b*v_color.b;
      finalColor.a = texColor.a*v_color.a;

      gl_FragColor = finalColor;
    }
    `,
    gl.FRAGMENT_SHADER,
  );

  const program = loadProgram(gl, [vertexShader, fragmentShader]);
  gl.useProgram(program);

  // look up where the vertex data needs to go.
  const positionAttrib = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttrib);
  const colorAttrib = gl.getAttribLocation(program, "a_color");
  gl.enableVertexAttribArray(colorAttrib);
  const textureCoordAttribute = gl.getAttribLocation(
    program,
    "a_texture_coord",
  );
  gl.enableVertexAttribArray(textureCoordAttribute);

  // lookup uniforms
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const textureSamplerLocation = gl.getUniformLocation(program, "u_sampler");

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.enable(gl.BLEND);

  // main program loop
  function animloop() {
    requestAnimationFrame(animloop);
    logic(width, height);
    render();
  }

  animloop();

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // set the resolution
    gl.uniform2f(resolutionLocation, width, height);
    gl.uniform1i(textureSamplerLocation, 0);

    drawRects(fireParticles);
    if (options.sparks) {
      drawRects(sparkParticles);
    }
  }

  function drawRects(rects) {
    let index = 0;
    let colorIndex = 0;
    let texIndex = 0;
    const rectArray = [];
    const colorArray = [];
    const textureCoordinates = [];
    rects.forEach((rect, i) => {
      const x1 = rect.pos.x - rect.size.width / 2;
      const x2 = rect.pos.x + rect.size.width / 2;
      const y1 = rect.pos.y - rect.size.height / 2;
      const y2 = rect.pos.y + rect.size.height / 2;
      index = concatInplace(
        index,
        rectArray,
        [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2],
      );
      texIndex = concatInplace(
        texIndex,
        textureCoordinates,
        [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0],
      );
      for (let ii = 0; ii < 6; ii++) {
        colorIndex = concatInplace(colorIndex, colorArray, [
          rects[i].color.r,
          rects[i].color.g,
          rects[i].color.b,
          rects[i].color.a,
        ]);
      }
    });

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.bindBuffer(gl.ARRAY_BUFFER, squareTextureCoordinateVertices);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(textureCoordinates),
      gl.STATIC_DRAW,
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectArray), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(colorArray),
      gl.STATIC_DRAW,
    );

    gl.drawArrays(gl.TRIANGLES, 0, rects.length * 6);
  }
}

class Grad {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  dot3(x, y, z) {
    return this.x * x + this.y * y + this.z * z;
  }
}

const grad3 = [
  new Grad(1, 1, 0),
  new Grad(-1, 1, 0),
  new Grad(1, -1, 0),
  new Grad(-1, -1, 0),
  new Grad(1, 0, 1),
  new Grad(-1, 0, 1),
  new Grad(1, 0, -1),
  new Grad(-1, 0, -1),
  new Grad(0, 1, 1),
  new Grad(0, -1, 1),
  new Grad(0, 1, -1),
  new Grad(0, -1, -1),
];

// deno-fmt-ignore
const p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

// To remove the need for index wrapping, double the permutation table length
const perm = new Array(512);
const gradP = new Array(512);
function seed(seed) {
  if (seed > 0 && seed < 1) {
    // Scale the seed out
    seed *= 65536;
  }

  seed = Math.floor(seed);
  if (seed < 256) {
    seed |= seed << 8;
  }

  for (let i = 0; i < 256; i++) {
    const v = i & 1 ? p[i] ^ (seed & 255) : p[i] ^ ((seed >> 8) & 255);

    perm[i] = perm[i + 256] = v;
    gradP[i] = gradP[i + 256] = grad3[v % 12];
  }
}

const fireParticles = [];
const sparkParticles = [];

function createFireParticle(emitCenter) {
  const size = randomSpread(
    options.fireSize,
    options.fireSize * (options.fireSizeVariance / 100.0),
  );
  const speed = randomSpread(
    options.fireSpeed,
    options.fireSpeed * options.fireSpeedVariance / 100.0,
  );

  const particle = {
    pos: random2DVec(emitCenter, options.fireEmitPositionSpread),
    vel: scaleVec(
      randomUnitVec(Math.PI / 2, options.fireEmitAngleVariance),
      speed,
    ),
    size: { width: size, height: size },
    color: {
      r: 0.9,
      g: 0.3,
      b: 0.3,
      a: 0.9,
    },
  };
  fireParticles.push(particle);
}

function createSparkParticle(emitCenter) {
  const size = randomSpread(
    options.sparkSize,
    options.sparkSize * (options.sparkSizeVariance / 100.0),
  );
  const origin = { ...emitCenter };
  const speed = randomSpread(
    options.sparkSpeed,
    options.sparkSpeed * options.sparkSpeedVariance / 100.0,
  );
  const particle = {
    origin: origin,
    pos: random2DVec(emitCenter, options.fireEmitPositionSpread),
    vel: scaleVec(
      randomUnitVec(Math.PI / 2, options.fireEmitAngleVariance * 2.0),
      speed,
    ),
    size: { width: size, height: size },
    color: { r: 1.0, g: 0.8, b: 0.3, a: 1.0 },
  };
  sparkParticles.push(particle);
}

function loadShader(gl, source, shaderType) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    lastError = gl.getShaderInfoLog(shader);
    throw new Error("*** Error compiling shader '" + shader + "':" + lastError);
  }

  return shader;
}

let particleDiscrepancy = 0;
let lastParticleTime = Date.now();
let sparkParticleDiscrepancy = 0;

seed(Math.random());

// Functions

// calculate new positions for all the particles
function logic(width, height) {
  const currentParticleTime = Date.now();
  let timeDifference = currentParticleTime - lastParticleTime;

  // we don't want to generate a ton of particles if the browser was minimized or something
  if (timeDifference > 100) {
    timeDifference = 100;
  }

  // update fire particles

  particleDiscrepancy += options.fireEmitRate * timeDifference / 1000.0;
  while (particleDiscrepancy > 0) {
    createFireParticle({ x: width / 2, y: height / 2 + 200 });
    --particleDiscrepancy;
  }

  const particleAverage = { x: 0, y: 0 };
  const numParts = fireParticles.length;

  fireParticles.forEach((fireParticle) => {
    particleAverage.x += fireParticle.pos.x / numParts;
    particleAverage.y += fireParticle.pos.y / numParts;
  });

  fireParticles.forEach((fireParticle, i) => {
    const x = fireParticle.pos.x;
    const y = fireParticle.pos.y;

    // apply wind to the velocity
    fireParticle.vel = addVecs(
      fireParticle.vel,
      scaleVec(
        unitVec(
          (simplex3(
            x / 500,
            y / 500,
            lastParticleTime * options.windTurbulance,
          ) + 1.0) * Math.PI * 0.5,
        ),
        options.windStrength,
      ),
    );

    // move the particle
    fireParticle.pos = addVecs(
      fireParticle.pos,
      scaleVec(fireParticle.vel, timeDifference / 1000.0),
    );

    fireParticle.color.a -= options.fireDeathSpeed +
      Math.abs(particleAverage.x - fireParticle.pos.x) *
        options.fireTriangleness;

    if (
      fireParticle.pos.y <= -fireParticle.size.height * 2 ||
      fireParticle.color.a <= 0
    ) {
      fireParticles.splice(i, 1);
    }
  });

  // update spark particles
  sparkParticleDiscrepancy += options.sparkEmitRate * timeDifference / 1000.0;
  while (sparkParticleDiscrepancy > 0) {
    createSparkParticle({ x: width / 2, y: height / 2 + 200 });
    sparkParticleDiscrepancy -= 1.0;
  }

  sparkParticles.forEach((sparkParticle, i) => {
    const { x, y } = sparkParticle.pos;
    sparkParticle.vel = addVecs(
      sparkParticle.vel,
      scaleVec(
        unitVec(
          (simplex3(x / 500, y / 500, lastParticleTime * 0.0003) + 1.0) *
            Math.PI * 0.5,
        ),
        20.0,
      ),
    );
    sparkParticle.pos = addVecs(
      sparkParticle.pos,
      scaleVec(sparkParticle.vel, timeDifference / 1000.0),
    );

    sparkParticle.color.a -= options.sparkDeathSpeed;

    if (
      sparkParticle.pos.y <= -sparkParticle.size.height * 2 ||
      sparkParticle.color.a <= 0
    ) {
      sparkParticles.splice(i, 1);
    }
  });

  lastParticleTime = currentParticleTime;
}

function concatInplace(index, arr1, arr2) {
  for (let i = 0; i < arr2.length; i++) {
    arr1[index] = arr2[i];
    index += 1;
  }
  return index;
}

function randomSpread(center, spread) {
  const start = center - spread;
  const end = center + spread;
  return Math.random() * (end - start) + start;
}

function random2DVec(center, spreadVec) {
  return {
    x: randomSpread(center.x, spreadVec.x),
    y: randomSpread(center.y, spreadVec.y),
  };
}

function randomUnitVec(center, spread) {
  const angle = randomSpread(center, spread);
  return { x: Math.cos(angle), y: -Math.sin(angle) };
}

function unitVec(angle) {
  return { x: Math.cos(angle), y: -Math.sin(angle) };
}

function addVecs(vec1, vec2) {
  return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
}

function scaleVec(vec, scalar) {
  return { x: vec.x * scalar, y: vec.y * scalar };
}

function loadProgram(gl, shaders) {
  const program = gl.createProgram();
  shaders.forEach((shader) => gl.attachShader(program, shader));
  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    lastError = gl.getProgramInfoLog(program);
    console.error("Error in program linking:" + lastError);

    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function simplex3(xin, yin, zin) {
  const G3 = 1 / 6;

  // Skew the input space to determine which simplex cell we're in
  const s = (xin + yin + zin) * (1 / 3); // Hairy factor for 2D
  let i = Math.floor(xin + s);
  let j = Math.floor(yin + s);
  let k = Math.floor(zin + s);

  const t = (i + j + k) * G3;
  const x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
  const y0 = yin - j + t;
  const z0 = zin - k + t;

  // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
  // Determine which simplex we are in.
  let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
  let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i2 = 1;
      j2 = 0;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 1;
      j2 = 0;
      k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else if (x0 < z0) {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    }
  }
  // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
  // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
  // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
  // c = 1/6.
  const x1 = x0 - i1 + G3; // Offsets for second corner
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;

  const x2 = x0 - i2 + 2 * G3; // Offsets for third corner
  const y2 = y0 - j2 + 2 * G3;
  const z2 = z0 - k2 + 2 * G3;

  const x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
  const y3 = y0 - 1 + 3 * G3;
  const z3 = z0 - 1 + 3 * G3;

  // Work out the hashed gradient indices of the four simplex corners
  i &= 255;
  j &= 255;
  k &= 255;
  const gi0 = gradP[i + perm[j + perm[k]]];
  const gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
  const gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
  const gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

  // Noise contributions from the four corners
  const n0 = noiseContribution(gi0, x0, y0, z0);
  const n1 = noiseContribution(gi1, x1, y1, z1);
  const n2 = noiseContribution(gi2, x2, y2, z2);
  const n3 = noiseContribution(gi3, x3, y3, z3);

  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 32 * (n0 + n1 + n2 + n3);
}

function noiseContribution(gi, x, y, z) {
  let t = 0.6 - x * x - y * y - z * z;
  if (t < 0) {
    return 0;
  }

  t *= t;
  return t * t * gi.dot3(x, y, z);
}

export default class LumeFire extends HTMLElement {
  constructor() {
    super();
    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 700;
    this.appendChild(canvas);
    start(canvas);
  }
}
