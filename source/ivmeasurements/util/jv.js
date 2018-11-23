import Graph from 'node-jsgraph';

class JV extends Graph.getConstructor('graph.waveform') {
  constructor() {
    super(...arguments);
  }

  getVoc() {
    let index;
    if (
      (index = this.findLevel(0, { rounding: 'interpolate' })) === undefined
    ) {
      throw new Error('Cannot find Voc');
    }
    console.log(index);
    return this.interpolateIndex_X(index);
  }

  getJsc() {
    const jsc = this.interpolate(0);
    if (isNaN(jsc)) {
      throw new Error('Cannot find Jsc');
    }
    return this.interpolate(0);
  }

  getFF() {
    return 0.5;
  }

  getPCE(cellArea, sunIntensity) {
    if (!this.power) {
      this.computePower();
    }

    const maxPower = this.power.getMax();
    const maxPowerIndex = this.power.findLevel(maxPower, { rounding: 'after' });

    if (maxPowerIndex == 0 || maxPowerIndex == this.getLength()) {
      throw 'Cannot find maximum power';
    }

    return maxPower / cellArea / sunIntensity;
  }

  computePower() {
    this.power = this.duplicate();

    this.power = this.power.math((x, y) => {
      return x * y;
    });
  }
}

export default JV;
