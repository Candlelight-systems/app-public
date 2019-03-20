import StatusGraph from '../cellstatusgraph.jsx';
import StatusIV from '../cellstatusiv.jsx';

import Graph from 'node-jsgraph/dist/jsgraph-es6';
import Timer from '../timer.jsx';
import extend from 'extend';
import { getIVParameters } from '../../../app/util/iv';
import { query as influxquery } from '../../influx';
import React from 'react';
import { ipcRenderer } from 'electron';
import environment from '../../../app/environment.json';
import {
  autoZero,
  getChannelStatus,
  saveChannelStatus,
  resetChannelStatus,
  channelExecuteIV,
  channelExecuteVoc,
  channelExecuteJsc
} from '../../queries';
import CellDetailedGraphs from './device/detailedGraphs.jsx';

var instrumentEnvironment = environment.instrument;

//import cfg from "./config"

const initialState = {
  display: 'eff',
  ellapsed: false,
  wsEllapsed: false,
  changeRate: false,
  absChangeRate: false,
  changeUnit: false,
  iv: null,
  data: null,
  data_IV: null,
  iv: null,
  efficiency: false,
  start_value: false,
  highest_value: false,
  voltage: false,
  ff: false,
  current: false,
  currentdensity: false,
  voc: false,
  jsc: false,
  sun: false,
  start: false,
  current: false,
  arrowstatus: false,
  change: false,
  showDetails: false,
  last_time: 0,

  _last_iv_time: false,
  _last_iv: null,
  _fist_iv: null,

  ivCurves: [],
  serverState: {}
};

function round(value, digits) {
  return Math.round(value * 10 ** digits) / 10 ** digits;
}

const zeroSerieTime = (serie, indexTimestamp = 0, timeRef) => {
  let date, time;

  serie.forEach((serieElement, index) => {
    date = new Date(serieElement[indexTimestamp]);
    time = date.getTime();

    if (index == 0 && timeRef === undefined) {
      timeRef = time;
      serieElement[indexTimestamp] = 0;
      return;
    }
    //console.log( date.getTime(), serieElement[indexTimestamp] );

    serieElement[indexTimestamp] = time - timeRef;
    serieElement[indexTimestamp] /= 1000 * 3600;
  });
};

const populateWaveformWithData = (waveform, data, indexX = 0, indexY = 1) => {
  waveform.setData(
    data.map(value => value[indexY]),
    data.map(value => value[indexX])
  );
};
class TrackerDevice extends React.Component {
  /**
   *	@param props.name The name of the cell
   */
  constructor(props) {
    super(props);

    this.unit = {
      voltage: <span>V</span>,
      currentdensity: (
        <span>
          mA cm<sup>-2</sup>
        </span>
      ),
      current: <span>mA</span>,
      efficiency: <span>%</span>,
      fillfactor: <span>%</span>,
      power: <span>W</span>,
      sun: <span>sun</span>,
      area: (
        <span>
          cm<sup>2</sup>
        </span>
      ),
      temperature: <span>°C</span>,
      humidity: <span>%</span>
    };

    this.state = extend(true, {}, initialState);
    this.state.data = Graph.newWaveform();

    this.cfg = this.cfg.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.pause = this.pause.bind(this);
    this.recordIV = this.recordIV.bind(this);
    this.recordJsc = this.recordJsc.bind(this);
    this.recordVoc = this.recordVoc.bind(this);

    this.downloadData = this.downloadData.bind(this);
    this.autoZero = this.autoZero.bind(this);

    this.details = this.details.bind(this);
    this.wsUpdate = this.wsUpdate.bind(this);

    //	this.formChanged = this.formChanged.bind( this );
    //this.state.tmpServerState = {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ updating: false });

    /**
     *  Norman, 4 January 2017:
     *	Some explaining might be useful here.
     *  We need to chose the source of truth of the channel status. Either it defines itself (see this.getStatus) or the group and in turn the instrument sets it
     *  But it can't be both, otherwise, if they are different (and they can be, at least temporarily), they will overwrite each other
     */

    // If the state has changed, we trigger a new query to the server to fetch the latest. This might be redundant though.
    if (this.props.serverState !== nextProps.serverState) {
      //this.getStatus();

      this.setState({ serverState: nextProps.serverState });
    }

    if (
      (nextProps.serverState.tracking_mode > 0 &&
        nextProps.measurementName &&
        nextProps.measurementName !== this.props.measurementName) ||
      !this.state.serverState
    ) {
      this.updateInfluxData(nextProps.serverState);
    }
  }

  componentDidMount() {
    this.setState({ updating: false });
    this.setState({ serverState: this.props.serverState });
    if (this.props.serverState.tracking_mode > 0) {
      this.updateInfluxData(this.props.serverState);
    }

    ipcRenderer.on(
      'channel.update.' + this.props.instrumentId + '.' + this.props.chanId,
      this.wsUpdate
    );
  }

  componentWillUnmount() {
    if (this.refreshInterval) {
      clearTimeout(this.refreshInterval);
      this.refreshInterval = true;
    }

    ipcRenderer.removeListener(
      'channel.update.' + this.props.instrumentId + '.' + this.props.chanId,
      this.wsUpdate
    );
  }

  async wsUpdate(event, data) {
    let newState = {};

    data.state = data.state || {};
    data.timer = data.timer || {};
    data.action = data.action || {};

    if (data.state.efficiency) {
      newState.efficiency = round(data.state.efficiency, 2);
    }

    if (data.state.current) {
      // Convert to mA
      newState.current = round(data.state.current * 1000, 3);
      newState.currentdensity =
        (data.state.current * 1000) / this.state.serverState.cellArea;
    }

    if (data.state.voltage) {
      newState.voltage = round(data.state.voltage, 3);
    }

    if (data.state.voltage && data.state.current && this.state.data_IV) {
      if (
        Math.abs(data.state.current * 1000) <
          environment.instrument[this.props.instrumentId].fsr &&
        Math.abs(data.state.voltage) <
          environment.instrument[this.props.instrumentId].voltageRange
      ) {
        this.state.data_IV.append(data.state.voltage, data.state.current);
        newState.data_IV = this.state.data_IV;
      }
    }

    if (data.state.power) {
      newState.power = round(data.state.power, 5);
    }

    if (data.state.voc) {
      newState.voc = round(data.state.voc, 2);
    }

    if (data.state.sun) {
      newState.sun = round(data.state.sun, 2);
    }

    if (data.state.jsc) {
      newState.jsc = (data.state.jsc * 1000) / this.state.serverState.cellArea;
    }

    if (data.state.temperature) {
      newState.temperature = data.state.temperature;
    }

    if (data.state.temperature_junction) {
      newState.temperature_junction = data.state.temperature_junction;
    }

    if (data.state.humidity) {
      newState.humidity = data.state.humidity;
    }

    if (!isNaN(data.timer.iv)) {
      // Timer for the next IV curve
      newState.timer_nextIV = { time: data.timer.iv, updated: Date.now() };
    } else if (data.timer.iv === null) {
      newState.timer_nextIV = { time: null, updated: Date.now() };
    }

    if (!isNaN(data.timer.jsc)) {
      // Timer for the next JSC measurement
      newState.timer_nextJsc = { time: data.timer.jsc, updated: Date.now() };
    } else if (data.timer.jsc === null) {
      newState.timer_nextJsc = { time: null, updated: Date.now() };
    }

    if (!isNaN(data.timer.voc)) {
      // Timer for the next Voc curve
      newState.timer_nextVoc = { time: data.timer.voc, updated: Date.now() };
    } else if (data.timer.voc === null) {
      newState.timer_nextVoc = { time: null, updated: Date.now() };
    }

    if (!isNaN(data.timer.aquisition)) {
      // Timer for the last aquisition
      newState.timer_aquisition = {
        time: data.timer.aquisition,
        updated: Date.now()
      };
    }

    if (!isNaN(data.timer.ellapsed)) {
      newState.timer_ellapsed = {
        time: data.timer.ellapsed,
        updated: Date.now()
      };
    }

    if (data.action.data) {
      let lastTime;

      if (
        this.state.data &&
        this.state.data.getLength &&
        this.state.data.getLength() > 0
      ) {
        lastTime = this.state.data.xdata.data[this.state.data.getLength() - 1];
        lastTime +=
          this.state.serverState.tracking_record_interval / 1000 / 3600;
      } else {
        lastTime = 0;
      }

      let statedata;
      if (this.state.data) {
        statedata = this.state.data;
      } else {
        statedata = Graph.newWaveform();
      }

      switch (this.parameter) {
        case 'efficiency':
          statedata.append(lastTime, data.state.efficiency);
          break;

        case 'voltage_mean':
          statedata.append(lastTime, data.state.voltage);
          break;

        case 'current_mean':
          statedata.append(lastTime, data.state.curent);
          break;

        case 'power_mean':
          statedata.append(lastTime, data.state.power);
          break;

        default:
          break;
      }

      //if( ! this.state.data ) {
      newState.data = statedata;
      //}
    }

    if (data.action.ivCurve) {
      this.updateInfluxData();
    }

    if (data.action.saved) {
      // Data has just been saved into the DB => reload it into the renderer
      this.updateInfluxData();
    }

    if (data.action.update) {
      await this.getStatus();
    }

    if (data.action.stopped) {
      await this.getStatus();
      newState = extend(true, {}, initialState);
      this.state = newState; // Force-remove all the other state that will pollute the new channel
    }

    this.setState(newState);
  }

  details() {
    this.setState({ details: !this.state.details });
  }
  saveStatus(newState) {
    return saveChannelStatus(this.props.config, newState);
  }

  resetChannel() {
    /*
		this.state.serverState.measurementName = false;
		this.state.serverState.cellName = "";
		this.state.serverState.cellArea = 0;
		this.state.serverState.tracking_mode = 0;
		this.state.serverState.enable = 0;

*/

    return resetChannelStatus(
      this.props.config,
      this.props.instrumentId,
      this.props.chanId
    );
  }

  async recordIV() {
    if (this.state.processing_iv) {
      return;
    }
    this.setState({ processing_iv: true, error_iv: false });
    try {
      await channelExecuteIV(
        this.props.config,
        this.props.instrumentId,
        this.props.chanId
      );
    } catch (e) {
      this.setState({ error_iv: true });
    }

    this.setState({ processing_iv: false });
  }

  async recordVoc() {
    if (this.state.processing_voc) {
      return;
    }

    this.setState({ processing_voc: true, error_voc: false });

    try {
      await channelExecuteVoc(
        this.props.config,
        this.props.instrumentId,
        this.props.chanId
      );
    } catch (e) {
      this.setState({ error_voc: true });
    }

    this.setState({ processing_voc: false });
  }

  async recordJsc() {
    if (this.state.processing_jsc) {
      return;
    }

    this.setState({ processing_jsc: true, error_jsc: false });

    try {
      await channelExecuteJsc(
        this.props.config,
        this.props.instrumentId,
        this.props.chanId
      );
    } catch (e) {
      this.setState({ error_jsc: true });
    }

    this.setState({ processing_jsc: false });
  }

  //formChanged( name, value ) {

  //	this.state.tmpServerState[ name ] = value;
  //this.setState( { tmpServerState: this.state.tmpServerState } );
  //this.state.tmpServerState = Object.assign( {}, this.state.tmpServerState );
  //}

  downloadData() {
    ipcRenderer.send(
      'downloadData',
      this.props.config,
      this.state.serverState.measurementName,
      this.props.chanId,
      this.props.instrumentId
    );
  }

  autoZero() {
    return autoZero(
      this.props.config,
      this.props.instrumentId,
      this.props.chanId
    ).catch(error => {
      this.setState({
        error: error
      });
    });
  }

  componentDidUpdate() {}

  pause() {
    this.state.serverState.enable = 0;
    this.saveStatus(this.state.serverState);
  }

  start() {
    this.saveStatus(
      Object.assign({}, this.state.serverState, {
        enable: 1,
        measurementName: this.state.serverState.cellName + '_' + Date.now()
      })
    );
  }

  stop() {
    this.data_sun = false;
    this.data_humidity = false;
    this.data_temperature = false;

    this.resetChannel();
  }

  cfg() {
    ipcRenderer.once('channelConfigured', (event, data) => {
      if (data.chanId != this.props.chanId) {
        return;
      }

      if (data.lightSource !== 'manual') {
        data.lightRefValue = 0;
      }

      this.saveStatus(data);
    });

    ipcRenderer.send('configChannel', {
      instrumentId: this.props.instrumentId,
      groupName: this.props.groupName,
      chanId: this.props.chanId,

      trackerHost: this.props.config.trackerHost,
      trackerPort: this.props.config.trackerPort
    });
  }

  getStatus() {
    return getChannelStatus(
      this.props.config,
      this.props.instrumentId,
      this.props.chanId
    )
      .then(response => {
        this.setState({
          serverState:
            response[this.props.groupName].channels[this.props.chanId]
        });
        //this.updateInfluxData( response );
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
  }

  readIV(value) {
    if (!value) {
      return;
    }

    let iv = value
        .replace('"', '')
        .split(',')
        .map(el => parseFloat(el)),
      wave = Graph.newWaveform();

    for (var i = 0; i < iv.length - 1; i += 2) {
      wave.append(iv[i], iv[i + 1]);
    }
    return wave;
  }

  updateInfluxData(serverState = this.state.serverState) {
    /*
     *	Procedure:
     *		1. Get number of points
     *		2. Use grouping to get 100 points
     *		3. Get latest vocs, jscs
     */
    let parameter,
      parameter_jv,
      newState = {},
      db = this.props.configDB.db,
      db_ds,
      grouping,
      timeQuery,
      query,
      queue = [];

    newState.influxTime = Date.now();

    if (!serverState.measurementName) {
      return;
    }

    switch (this.state.serverState.tracking_mode) {
      case 3:
        parameter = 'current_mean';
        parameter_jv = 'jsc';
        break;

      case 2:
        parameter = 'voltage_mean';
        parameter_jv = 'voc';
        break;

      default:
      case 1:
        parameter = 'efficiency';
        parameter_jv = 'pce';
        break;
    }
    this.parameter = parameter;

    const tableName = encodeURIComponent(serverState.measurementName);
    let queries = [
      `SELECT time, efficiency, power FROM "${tableName}" ORDER BY time ASC limit 1`,
      `SELECT time, efficiency, power_mean, current_mean, voltage_mean, sun, pga, temperature_base, temperature_vsensor, temperature_junction, humidity FROM "${tableName}" ORDER BY time DESC limit 1`,
      `SELECT time, iv, sun FROM "${tableName}_iv" ${
        this.state._last_iv_time
          ? `WHERE time > '${this.state._last_iv_time}'`
          : ''
      } ORDER BY time ASC`,
      `SELECT voc FROM "${tableName}_voc" ORDER BY time DESC`,
      `SELECT jsc FROM "${tableName}_jsc" ORDER BY time DESC`
    ];

    let newIvCurves = false;

    influxquery(queries.join(';'), db, this.props.configDB)
      .then(results => {
        if (results[2].series && results[2].series[0]) {
          newState.ivCurves = this.state.ivCurves.splice(0);
          newState.ivCurves = newState.ivCurves.concat(
            results[2].series[0].values.map((value, index) => {
              if (index == results[2].series[0].values.length - 1) {
                newState._last_iv_time = value[0];
              }

              let t1;
              let t2 = new Date(value[0]);

              if (results[0].series) {
                t1 = new Date(results[0].series[0].values[0][0]);
                t1 = t1.getTime();
              } else {
                t1 = null;
              }

              return {
                time: t2,
                iv: this.readIV(value[1]),
                sun: value[2],
                ellapsed: t1 !== null ? (t2.getTime() - t1) / 3600000 : null
              };
            })
          );

          //console.log( newState.ivCurves );

          newState.iv_values = newState.ivCurves.map(ivCurve => {
            const p = ivCurve.iv.duplicate().math((x, y) => x * y);
            const parameters = getIVParameters(
              ivCurve.iv,
              p,
              this.state.serverState.cellArea,
              ivCurve.sun * 1000,
              true
            );

            return [ivCurve.ellapsed, parameters[parameter_jv], parameters];
          });
        }

        // Even if the series don't exist, we can still update the j-V curve
        // The only thing we have to do is not throw any error and handle gracefully the lack of data
        if (!results[0].series) {
          return; //throw "No measurement with the name " + serverState.measurementName + " or no associated data";
        }

        let timefrom = results[0].series[0].values[0][0],
          timeto = results[1].series[0].values[0][0],
          timefrom_date = new Date(timefrom),
          timeto_date = new Date(timeto);

        newState.latest = timeto_date.getTime();
        newState.start_value =
          Math.round(results[0].series[0].values[0][1] * 100) / 100;
        newState.efficiency = round(results[1].series[0].values[0][1], 2);
        //console.log( results[ 1 ].series[ 0 ].values[ 0 ][ 2 ] );
        newState.power =
          Math.round(results[1].series[0].values[0][2] * 1000000) / 1000000;
        newState.current = results[1].series[0].values[0][3] * 1000;
        newState.currentdensity =
          (results[1].series[0].values[0][3] * 1000) / serverState.cellArea;
        newState.voltage = parseFloat(
          results[1].series[0].values[0][4]
        ).toPrecision(3);
        newState.sun =
          Math.round(results[1].series[0].values[0][5] * 100) / 100;
        newState.pga = results[1].series[0].values[0][6];
        newState.temperature_base = results[1].series[0].values[0][7];
        newState.temperature_vsensor = results[1].series[0].values[0][8];
        newState.temperature_junction = results[1].series[0].values[0][9];
        newState.humidity = results[1].series[0].values[0][10];

        //	let cnt = results[ 2 ].series[ 0 ].values[ 0 ][ 1 ];

        let timeDifference = (timeto_date - timefrom_date) / 1000;

        newState.last_time = timeto_date;
        newState.ellapsed = timeDifference;

        grouping = Math.max(1, Math.round(timeDifference / 100));

        if (timeDifference > 3 * 24 * 3600) {
          // Display in days
          db_ds = db; // + "_downsampled_1h";
        } else if (timeDifference > 300) {
          db_ds = db; // + "_downsampled_1min";
        } else {
          db_ds = db;
        }

        //query = "SELECT time, MAX(efficiency) as effMax FROM \"" + this.state.serverState.measurementName + "\" ORDER BY time ASC limit 1;"
        //queue.push( influxquery( query, db_ds ).then( ( results ) => {

        newState.vocs = Graph.newWaveform();
        newState.jscs = Graph.newWaveform();

        if (results[3] && results[3].series) {
          if (this.state.serverState.tracking_mode == 1) {
            newState.voc =
              Math.round(results[3].series[0].values[0][1] * 1000) / 1000;
          }

          results[3].series[0].values.reverse();
          zeroSerieTime(
            results[3].series[0].values,
            0,
            timefrom_date.getTime()
          );
          populateWaveformWithData(newState.vocs, results[3].series[0].values);
        }

        if (results[4] && results[4].series) {
          if (this.state.serverState.tracking_mode == 1) {
            newState.jsc =
              (results[4].series[0].values[0][1] / serverState.cellArea) * 1000;
          }

          results[4].series[0].values.reverse();
          zeroSerieTime(
            results[4].series[0].values,
            0,
            timefrom_date.getTime()
          );
          populateWaveformWithData(newState.jscs, results[4].series[0].values);
        }

        //console.log( results[ 1 ].series[ 0 ].values[ 0 ][ 1 ] );
        if (
          results[1].series[0].values[0][1] == -1 ||
          results[1].series[0].values[0][5] < 0.015
        ) {
          parameter = 'power_mean';
        }

        this.parameter = parameter;
        query =
          'SELECT MEAN(' +
          parameter +
          ') as param, MAX(' +
          parameter +
          ') as maxEff, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN( sun ) as sMean, MEAN( temperature_junction ) as tMean, MEAN( humidity ) as hMean, MEAN( power_mean ) as pMean, MEAN( efficiency ) as effMean  FROM "' +
          encodeURIComponent(serverState.measurementName) +
          '" WHERE time >= \'' +
          timefrom +
          "' and time <= '" +
          timeto +
          "'  GROUP BY time(" +
          grouping +
          's) FILL(none) ORDER BY time ASC; SELECT ' +
          parameter +
          ' FROM "' +
          encodeURIComponent(serverState.measurementName) +
          '" ORDER BY time ASC LIMIT 1;';

        queue.push(
          influxquery(query, db_ds, this.props.configDB).then(results => {
            let values = results[0].series[0].values,
              offset,
              wave = Graph.newWaveform(),
              waveIV = Graph.newWaveform(),
              waveSun = Graph.newWaveform(),
              waveHumidity = Graph.newWaveform(),
              waveTemperature = Graph.newWaveform(),
              wavePCE = Graph.newWaveform(),
              waveVoltage = Graph.newWaveform(),
              waveCurrent = Graph.newWaveform(),
              highest_value = 0,
              highest_value_time = 0;

            newState.start_value =
              Math.round(results[1].series[0].values[0][1] * 100) / 100;

            // First point gives the initial efficiency, 2nd row
            if (values.length < 2) {
              newState.data = false;
              return;
            }

            let valueIndex = 1;
            let totalEnergyJoules = 0;
            let last_power;

            values.forEach((value, index) => {
              let date = new Date(value[0]),
                time;

              if (index == 0) {
                offset = date.getTime();
                time = 0;
              } else {
                time = (date.getTime() - offset) / 1000 / 3600;
              }

              // Power is in index 8
              /*
						y1	|`
							|  `
							|	 `
							|	   `| y2
							|		|
							|		|
							|		|
							|		|
							|		|
							|		|
							|		|
							x1      x2

					Area = ( ( x2 - x1 ) * ( y1 + y2 ) ) / 2
					*/

              if (time > 0) {
                totalEnergyJoules +=
                  (((time - wave.getX(wave.getLength() - 1)) *
                    (value[8] + last_power)) /
                    2) *
                  3600;
              }

              last_power = value[8];

              //value[ valueIndex ] += 2;
              if (this.state.serverState.tracking_mode == 1) {
                if (value[valueIndex] > 35 || value[valueIndex] < 0) {
                  // Higher than 35% => fail. Lower than 0% => fail.
                  return;
                }
              } else if (this.state.serverState.tracking_mode == 3) {
                value[valueIndex] *= 1000; // In current mode, show mAmps
              }

              wave.append(time, value[valueIndex]);

              wavePCE.append(time, value[9]);
              waveVoltage.append(time, value[3]);
              waveCurrent.append(time, value[4]);
              waveSun.append(time, value[5]);

              if (index > values.length * 0.8) {
                if (
                  Math.abs(value[4] * 1000) <
                    environment.instrument[this.props.instrumentId].fsr &&
                  Math.abs(value[3]) <
                    environment.instrument[this.props.instrumentId].voltageRange
                ) {
                  waveIV.append(value[3], value[4]);
                }
              }

              waveTemperature.append(time, value[6]);
              waveHumidity.append(time, value[7]);

              if (this.state.serverState.tracking_mode == 1) {
                if (value[1] > highest_value && !isNaN(value[1])) {
                  highest_value = value[1];
                  highest_value_time = time;
                }
              }
            });

            if (this.state.serverState.tracking_mode == 2) {
              newState.voc =
                Math.round(values[values.length - 1][2] * 1000) / 1000;
            }

            if (this.state.serverState.tracking_mode == 3) {
              newState.jsc =
                Math.round(values[values.length - 1][2] * 100) / 100;
            }

            // totalEnergyKWh is in watt * hour (see unit analysis)
            let totalEnergykWh = totalEnergyJoules / 3600000; // Get the value in kWh

            const totalEnergykWh_per_year =
              (totalEnergykWh / wave.getX(wave.getLength() - 1)) * (24 * 365); // Times the number of ellapsed hours divided by the number of hours in a year
            const totalEnergykWh_per_year_per_m2 =
              totalEnergykWh_per_year / (serverState.cellArea / 10000);

            newState.highest_value = Math.round(highest_value * 100) / 100;
            newState.highest_value_time = highest_value_time;
            newState.data = wave;

            newState.data_sun = waveSun;
            newState.data_temperature = waveTemperature;
            newState.data_humidity = waveHumidity;
            newState.data_IV = waveIV;
            console.log(wavePCE);
            newState.data_pce = wavePCE;
            newState.data_voltage = waveVoltage;
            newState.data_current = waveCurrent;

            newState.kwh_yr_m2 =
              Math.round(totalEnergykWh_per_year_per_m2 * 100) / 100;
          })
        );

        return Promise.all(queue)
          .then(() => {
            //console.log( newState.power, serverState.cellArea, newState.voc, newState.jsc );
            newState.ff = Math.round(
              (newState.power /
                serverState.cellArea /
                ((newState.voc * newState.jsc) / 1000)) *
                100
            );
            newState.updating = false;
          })
          .catch(error => {
            console.error('Could not process influx DB request.');
            console.error(error);
          })
          .then(() => {
            this.setState(newState);
          });
      })
      .catch(error => {
        console.error('Could not process influx DB request.');
        console.error(error);
      })
      .then(() => {
        this.setState(newState);

        //			this.scheduleRefresh();
      });
  }

  processCurrent(value) {
    if (isNaN(value) || value === false) {
      return;
    }

    if (Math.abs(value) < 1) {
      return (
        <span>
          {Math.round(value * 100000) / 100}&nbsp;&mu;A&nbsp;cm<sup>-2</sup>
        </span>
      );
    } else {
      return (
        <span>
          {(Math.round(value * 100) / 100).toPrecision(3)}&nbsp;mA&nbsp;cm
          <sup>-2</sup>
        </span>
      );
    }
  }

  render() {
    let unit,
      arrowstatus,
      change,
      changeUnit,
      currVal,
      startVal,
      startValPos,
      trackingMode,
      statusGraphAxisLabel,
      statusGraphAxisUnit,
      statusGraphSerieLabelLegend;

    switch (this.parameter) {
      case 'efficiency':
        unit = '%';
        startVal = this.state.highest_value;
        startValPos = this.state.highest_value_time;
        currVal = this.state.efficiency;

        trackingMode = 'MPPT';
        statusGraphAxisLabel = 'Efficiency';
        statusGraphAxisUnit = '%';
        statusGraphSerieLabelLegend = 'PCE';

        break;

      case 'voltage_mean':
        unit = 'V';
        startVal = this.state.start_value;
        startValPos = 0;
        currVal = this.state.voc;

        trackingMode = 'Voc';
        statusGraphAxisLabel = 'Voltage';
        statusGraphAxisUnit = 'V';
        statusGraphSerieLabelLegend = 'Voc';
        break;

      case 'current_mean':
        unit = this.unit.currentdensity;
        startVal = this.state.start_value;
        startValPos = 0;
        currVal = this.state.jsc;

        trackingMode = 'Jsc';
        statusGraphAxisLabel = 'Current density';
        statusGraphAxisUnit = 'mA cm^-2';
        statusGraphSerieLabelLegend = 'Jsc';
        break;

      case 'power_mean':
        unit = this.unit.power;
        startVal = this.state.start_value;
        startValPos = 0;
        currVal = this.state.power;

        trackingMode = 'MPPT';
        statusGraphAxisLabel = 'Power';
        statusGraphAxisUnit = 'W';
        statusGraphSerieLabelLegend = 'Pout';
        break;

      default:
        trackingMode = 'No tracking';
        break;
    }

    let active =
      this.state.serverState.enable > 0 &&
      this.state.serverState.tracking_mode > 0;
    let notavailable = 'N/A';

    const j_currentdensity = this.processCurrent(this.state.currentdensity);
    const jsc_currentdensity = this.processCurrent(this.state.jsc);

    if (
      !instrumentEnvironment[this.props.instrumentId] ||
      !instrumentEnvironment[this.props.instrumentId].groups[
        this.props.groupName
      ]
    ) {
      return (
        <div className="alert alert-danger">
          Instrument or Group could not be found in software config. Expecting
          Instrument "{this.props.instrumentId}" and Group "
          {this.props.groupName}"
        </div>
      );
    }

    //console.log( this.props, instrumentEnvironment );
    const displayElements =
      instrumentEnvironment[this.props.instrumentId].groups[
        this.props.groupName
      ].displayDeviceInformation;
    const button_autozero =
      instrumentEnvironment[this.props.instrumentId].autoZero == 'device' ? (
        <button className="btn btn-cl" onClick={this.autoZero}>
          {' '}
          Auto zero
        </button>
      ) : null;

    if (active) {
      return (
        <div
          ref={el => (this.wrapper = el)}
          className={
            'cl-device ' +
            (active ? 'cell-running' : 'cell-stopped') +
            ' show-details'
          }
          style={this.state.details && active ? { height: '700px' } : {}}>
          <div className="col-lg-7">
            <div className="cell-name cell-main-info row">
              <div className="col-lg-9">
                <span>
                  <input
                    type="checkbox"
                    className="channel-check"
                    onClick={this.props.toggleChannelCheck}
                    checked={!!this.props.channelChecked}
                  />
                </span>
                <span className="label">
                  <span className="glyphicon glyphicon-tags" />
                </span>
                <span className="value">
                  <span>#{this.props.chanId} :</span>{' '}
                  {this.state.serverState.cellName}
                </span>{' '}
                {this.state.serverState.cellArea ? (
                  <span className="cell-area">
                    ( {this.state.serverState.cellArea} cm<sup>2</sup> )
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="cell-timing row">
              <div className="col-xs-1">
                <div>Last data</div>
                <div>
                  <Timer
                    precision={1}
                    direction="ascending"
                    timerValue={this.state.timer_aquisition}
                  />
                </div>
              </div>

              <div
                className={
                  'col-xs-1 propElement' +
                  (this.state.processing_iv ? ' processing' : '') +
                  (this.state.error_iv ? ' processing-error' : '')
                }>
                <div className="record">
                  <span
                    className="glyphicon glyphicon-record"
                    onClick={this.recordIV}
                  />
                </div>
                <div>Next IV curve</div>
                <div>
                  <Timer
                    negative="Overdue"
                    precision={2}
                    direction="descending"
                    timerValue={this.state.timer_nextIV}
                  />
                </div>
              </div>

              <div
                className={
                  'col-xs-1 propElement' +
                  (this.state.processing_voc ? ' processing' : '') +
                  (this.state.error_voc ? ' processing-error' : '')
                }>
                <div className="record">
                  <span
                    className="glyphicon glyphicon-record"
                    onClick={this.recordVoc}
                  />
                </div>
                <div>Next Voc</div>
                <div>
                  <Timer
                    negative="Overdue"
                    precision={2}
                    direction="descending"
                    timerValue={this.state.timer_nextVoc}
                  />
                </div>
              </div>

              <div
                className={
                  'col-xs-1 propElement' +
                  (this.state.processing_jsc ? ' processing' : '') +
                  (this.state.error_jsc ? ' processing-error' : '')
                }>
                <div className="record">
                  <span
                    className="glyphicon glyphicon-record"
                    onClick={this.recordJsc}
                  />
                </div>
                <div>Next Jsc</div>
                <div>
                  <Timer
                    negative="Overdue"
                    precision={2}
                    direction="descending"
                    timerValue={this.state.timer_nextJsc}
                  />
                </div>
              </div>
            </div>

            <div className="cell-summary row">
              <div className={`col-lg-1 cell-status ${active ? 'active' : ''}`}>
                <div>
                  {active ? (
                    <span className="glyphicon glyphicon-record" />
                  ) : (
                    <span className="glyphicon glyphicon-stop" />
                  )}
                </div>
                {trackingMode}
              </div>
              {displayElements.time_ellapsed && (
                <div className="col-lg-1 propElement">
                  <div>
                    <div className="label">
                      <span className="glyphicon glyphicon-hourglass" />
                    </div>
                    <div className="value">
                      <Timer
                        precision={1}
                        maxLevel={3}
                        spacer=" "
                        direction="ascending"
                        timerValue={this.state.timer_ellapsed}
                      />
                    </div>
                  </div>
                </div>
              )}
              {displayElements.pce && (
                <div className="col-xs-1 propElement">
                  <div>
                    <div className="label">&eta;</div>
                    <div className="value">
                      <strong>
                        {!isNaN(this.state.efficiency) &&
                        this.state.efficiency !== false &&
                        this.state.efficiency >= 0 ? (
                          <span>
                            {this.state.efficiency} {this.unit.efficiency}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
              {displayElements.power && (
                <div className="col-xs-1 propElement">
                  <div>
                    <div className="label">
                      P<sub>out</sub>
                    </div>
                    <div className="value">
                      <strong>
                        {!isNaN(this.state.power) &&
                        this.state.power !== false ? (
                          <span>
                            {this.state.power} {this.unit.power}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {displayElements.sun && (
                <div className="col-xs-1 propElement">
                  <div>
                    <div className="label">
                      <span className="glyphicon glyphicon-scale" />
                    </div>
                    <div className="value">
                      {!isNaN(this.state.sun) &&
                      this.state.sun !== false &&
                      this.state.sun >= 0 ? (
                        <span>
                          {this.state.sun} {this.unit.sun}
                        </span>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                </div>
              )}
              {displayElements.voc && (
                <div
                  className={
                    'col-xs-1 propElement' +
                    (this.state.processing_voc ? ' processing' : '') +
                    (this.state.error_voc ? ' error' : '')
                  }>
                  <div className="record">
                    <span
                      className="glyphicon glyphicon-record"
                      onClick={this.recordVoc}
                    />
                  </div>
                  <div className="label">
                    V<sub>oc</sub>
                  </div>
                  <div className="value">
                    {!isNaN(this.state.voc) && this.state.voc !== false ? (
                      <span>
                        {this.state.voc} {this.unit.voltage}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              )}
              {displayElements.jsc && (
                <div
                  className={
                    'col-xs-1 propElement' +
                    (this.state.processing_jsc ? ' processing' : '') +
                    (this.state.error_jsc ? ' error' : '')
                  }>
                  <div className="record">
                    <span
                      className="glyphicon glyphicon-record"
                      onClick={this.recordJsc}
                    />
                  </div>
                  <div className="label">
                    J<sub>sc</sub>
                  </div>
                  <div className="value">{jsc_currentdensity || 'N/A'}</div>
                </div>
              )}
              {displayElements.ff && (
                <div className="col-xs-1 propElement">
                  <div className="label">FF</div>
                  <div className="value">
                    {!isNaN(this.state.ff) && this.state.ff !== false ? (
                      <span>
                        {this.state.ff} {this.unit.fillfactor}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              )}
              {displayElements.vnow && (
                <div className="col-xs-1 propElement">
                  <div className="label">
                    V<sub>now</sub>
                  </div>
                  <div className="value">
                    {!isNaN(this.state.voltage) &&
                    this.state.voltage !== false ? (
                      <span>
                        {this.state.voltage} {this.unit.voltage}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              )}
              {displayElements.jnow && (
                <div className="col-xs-1 propElement">
                  <div className="label">
                    J<sub>now</sub>
                  </div>
                  <div className="value">{j_currentdensity || 'N/A'}</div>
                </div>
              )}
              {displayElements.temperature && (
                <div className="col-lg-1 propElement">
                  <div>
                    <div className="label">
                      <span className="glyphicon glyphicon-grain" />
                    </div>
                    <div className="value">
                      {this.state.temperature && this.state.temperature > 0 ? (
                        <span title="Base temperature (local temperature on the chip just under the device)">
                          {this.state.temperature}
                        </span>
                      ) : (
                        'N/A'
                      )}
                      &nbsp;/&nbsp;
                      {this.state.temperature_junction &&
                      this.state.temperature_junction > 0 ? (
                        <span title="Estimated junction temperature (base temperature + thermopile voltage)">
                          {this.state.temperature_junction}{' '}
                          {this.unit.temperature}
                        </span>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                </div>
              )}
              {displayElements.humidity && (
                <div className="col-lg-1 propElement">
                  <div>
                    <div className="label">
                      <span className="glyphicon glyphicon-tint" />
                    </div>
                    <div className="value">
                      {!isNaN(this.state.humidity) &&
                      this.state.humidity >= 0 ? (
                        <span>
                          {this.state.humidity} {this.unit.humidity}
                        </span>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                </div>
              )}
              {displayElements.kwh_yr && (
                <div className="col-lg-1 propElement">
                  <div>
                    <div className="label">
                      kWh yr<sup>-1</sup>m<sup>-2</sup>
                    </div>
                    <div className="value">
                      {this.state.kwh_yr_m2 && this.state.kwh_yr_m2 > 0 ? (
                        <span>{this.state.kwh_yr_m2}</span>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="cell-efficiency col-lg-6">
                <StatusGraph
                  shown={true}
                  width="720"
                  height="60"
                  mode="default"
                  key={this.props.instrumentId + this.props.chanId + '_graph'}
                  data={this.state.data}
                  flag1={startVal}
                  flag1_pos={startValPos}
                  unit={unit}
                  axisLabel={statusGraphAxisLabel}
                  axisUnit={statusGraphAxisUnit}
                  serieLabelLegend={statusGraphSerieLabelLegend}
                  flag2={currVal}
                  data_IV={this.state.iv_values}
                />
              </div>
            </div>

            <div className="row cell-actions">
              <div className="col-lg-1 label">Actions</div>
              <div className="col-lg-8">
                <button className="btn btn-cl" onClick={this.downloadData}>
                  <span className="glyphicon glyphicon-download-alt" /> Download
                </button>
                {button_autozero}
                <button className="btn btn-cl" onClick={this.stop}>
                  <span className="glyphicon glyphicon-stop" /> Stop
                </button>
                <button className="btn btn-cl" onClick={this.cfg}>
                  <span className="glyphicon glyphicon-cog" /> Configure
                </button>
                <button
                  className={
                    'btn btn-cl' + (this.state.details ? ' btn-active' : '')
                  }
                  onClick={this.details}>
                  <span className="glyphicon glyphicon-stats" /> Detailed graphs
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-2 cell-iv">
            <StatusIV
              width="290"
              height="230"
              shown={true}
              instrumentId={this.props.instrumentId}
              data={this.state.ivCurves}
              dataIV={this.state.data_IV}
              voltage={this.state.voltage}
              current={this.state.current}
              cellarea={this.state.serverState.cellArea}
              updatedTime={this.state.influxTime}
            />
          </div>
          <div>
            {this.state.details && (
              <div className="col-lg-9">
                <CellDetailedGraphs
                  voltage={this.state.data_voltage}
                  current={this.state.data_current}
                  pce={this.state.data_pce}
                  vocs={this.state.vocs}
                  jscs={this.state.jscs}
                  //ff={this.state.ff }
                  power={this.state.power}
                  ivData={this.state.iv_values}
                  width="920"
                  height="100"
                />
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div ref={el => (this.wrapper = el)} className="cl-device cell-unknown">
          <div className="cell-name cell-main-info row">
            <div className="col-lg-4">
              <span>
                <input
                  type="checkbox"
                  className="channel-check"
                  onClick={this.props.toggleChannelCheck}
                  checked={!!this.props.channelChecked}
                />
              </span>
              <span className="label">
                <span className="glyphicon glyphicon-tags" />
              </span>
              <span className="value">
                {!this.state.serverState.cellName ? (
                  <span>Channel #{this.props.chanId}</span>
                ) : (
                  this.state.serverState.cellName
                )}
              </span>
            </div>
            <div className="col-lg-4">
              <button className="btn btn-cl btn-sm" onClick={this.cfg}>
                <span className="glyphicon glyphicon-cog" /> Configure
              </button>
              {!!(
                this.state.serverState.cellName &&
                this.state.serverState.cellName.length > 0 &&
                !active &&
                this.state.serverState.tracking_mode > 0
              ) && (
                <div>
                  <button className="btn btn-cl btn-sm" onClick={this.start}>
                    <span className="glyphicon glyphicon-start" /> Start
                  </button>{' '}
                  {button_autozero}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TrackerDevice;
