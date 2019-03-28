import { getIVParameters } from "../../app/util/iv";

export const getJVWaveforms = async (db, props) => {
  const data = getJVData(db, props);

  const vocs = Graph.newWaveform();
  const jscs = Graph.newWaveform();
  const ffs = Graph.newWaveform();
  const pces = Graph.newWaveform();

  waveforms = data[0].map(data => {
    if (!data.wave) {
      return;
    }

    const parameters = getIVParameters(
      data.wave,
      undefined,
      this.props.cellArea,
      data.sun * 1000,
      true
    );

    vocs.append(data.time_h, parameters.voc);
    jscs.append(data.time_h, parameters.jsc);
    ffs.append(data.time_h, parameters.ff);
    pces.append(data.time_h, parameters.pce);

    return data;
  });

  waveforms.pces = pces;
  waveforms.jscs = jscs;
  waveforms.ffs = ffs;
  waveforms.vocs = vocs;
};

export const getTrackData = (
  db,
  measurementName,
  props,
  numberOfPoints = 3000,
  getEfficiencyAtIntervals = false
) => {
  measurementName = encodeURIComponent(measurementName);
  return influxquery(
    `SELECT time,efficiency FROM "${measurementName}" ORDER BY time ASC limit 1;SELECT time,efficiency FROM "${measurementName}" ORDER BY time DESC limit 1;`,
    db,
    db.db
  ).then(async results => {
    if (!results[0].series) {
      throw `No measurement with the name "${measurementName}" or no associated data`;
    }

    let timefrom = results[0].series[0].values[0][0],
      timeto = results[1].series[0].values[0][0],
      timeDifference = (new Date(timeto) - new Date(timefrom)) / 1000;

    let query;
    if (numberOfPoints == "all") {
      query = `SELECT efficiency, voltage_mean, current_mean, humidity, sun, temperature_junction, efficiency, power_mean, temperature_base FROM
        "${measurementName}"
        WHERE time >= '${timefrom}' and time <= '${timeto}' ORDER BY time ASC`;
    } else {
      const grouping = Math.max(
        1,
        Math.round(timeDifference / parseInt(numberOfPoints))
      );
      query = `SELECT MEAN(efficiency) as effMean, MEAN(voltage_mean) as vMean, MEAN(current_mean) as cMean, MEAN(humidity) as hMean, MEAN(sun) as sMean, MEAN(temperature_junction) as tMean, MAX(efficiency) as maxEff, MEAN(power_mean) as pMean, MEAN(temperature_base) as tMean2 FROM
        "${measurementName}"
        WHERE time >= '${timefrom}' and time <= '${timeto}' GROUP BY time(${grouping}s) FILL(none) ORDER BY time ASC`;
    }

    const returnObject = await influxquery(query, db, db.db).then(results => {
      let values = results[0].series[0].values,
        offset,
        waveDate = Graph.newWaveform(),
        waveEfficiency = Graph.newWaveform(),
        waveVoltage = Graph.newWaveform(),
        waveCurrent = Graph.newWaveform(),
        wavePower = Graph.newWaveform(),
        waveSun = Graph.newWaveform(),
        waveTemperature = Graph.newWaveform(),
        waveHumidity = Graph.newWaveform();

      waveEfficiency.setUnit("%");
      waveEfficiency.setXUnit("h");
      waveVoltage.setUnit("V");
      wavePower.setUnit("W");
      waveCurrent.setUnit("mA cm-2");

      waveSun.setUnit("-");
      waveTemperature.setUnit("°C");
      waveHumidity.setUnit("%");

      let maxEfficiency = 0;
      let finalEfficiency = 0;

      values.forEach((value, index) => {
        let date = new Date(value[0]),
          time;

        if (index == 0) {
          offset = date.getTime();
          time = 0;
        } else {
          time = (date.getTime() - offset) / 1000 / 3600;
        }

        waveDate.append(
          time,
          date.getDate() +
            "." +
            date.getMonth() +
            "." +
            date.getFullYear() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds()
        );
        waveEfficiency.append(time, value[1]);
        waveVoltage.append(time, value[2]);
        waveCurrent.append(time, value[3]);
        wavePower.append(time, value[8]);
        waveHumidity.append(time, value[4]);
        waveSun.append(time, value[5]);

        if (value[6] !== null) {
          waveTemperature.append(time, value[6]);
        } else if (value[9] !== null) {
          waveTemperature.append(time, value[9]);
        }

        maxEfficiency = Math.max(maxEfficiency, value[7]);
      });

      finalEfficiency = values[values.length - 1][7];

      return {
        efficiency: waveEfficiency,
        voltage: waveVoltage,
        current: waveCurrent,
        sun: waveSun,
        temperature: waveTemperature,
        humidity: waveHumidity,
        power: wavePower,
        date: waveDate,

        maxEfficiency: maxEfficiency,
        finalEfficiency: finalEfficiency,
        ellapsed: timeDifference / 3600 // in hours
      };
    });

    if (getEfficiencyAtIntervals) {
      let tfrom = new Date(timefrom).getTime() * 1000000;

      let time_1h = tfrom + 1000000000 * 3600;
      let time_24h = tfrom + 1000000000 * 3600 * 24;
      let time_100h = tfrom + 1000000000 * 3600 * 100;
      let time_500h = tfrom + 1000000000 * 3600 * 500;
      let time_1000h = tfrom + 1000000000 * 3600 * 1000;

      returnObject.timeEfficiencies = await influxquery(
        `SELECT efficiency FROM "${measurementName}" WHERE time > ${time_1h} ORDER BY time ASC LIMIT 1;
         SELECT efficiency FROM "${measurementName}" WHERE time > ${time_24h} ORDER BY time ASC LIMIT 1;
         SELECT efficiency FROM "${measurementName}" WHERE time > ${time_100h} ORDER BY time ASC LIMIT 1;
         SELECT efficiency FROM "${measurementName}" WHERE time > ${time_500h} ORDER BY time ASC LIMIT 1;
         SELECT efficiency FROM "${measurementName}" WHERE time > ${time_1000h} ORDER BY time ASC LIMIT 1;`,
        db,
        db.db
      ).then(results => {
        return results.map(result => {
          if (!result.series) {
            return;
          }

          return result.series[0].values[0][1];
        });
      });
    }

    return returnObject;
  });
};

export const getVocJscData = (db, measurementName, props) => {
  let waveVoc = Graph.newWaveform(),
    waveJsc = Graph.newWaveform(),
    timefrom;

  measurementName = encodeURIComponent(measurementName);

  return influxquery(
    `SELECT time,efficiency FROM "${measurementName}" ORDER BY time ASC limit 1;
     SELECT time,voc FROM "${measurementName}_voc" ORDER BY time ASC;
     SELECT time,jsc FROM "${measurementName}_jsc" ORDER BY time ASC;`,
    db,
    db.db
  ).then(async results => {
    results.forEach((results, index) => {
      if (index == 0) {
        timefrom = new Date(results.series[0].values[0][0]);
        return;
      }

      if (!results.series) {
        return [];
      }

      return results.series[0].values.map(value => {
        let date = new Date(value[0]),
          time =
            Math.round(
              ((date.getTime() - timefrom.getTime()) / 1000 / 3600) * 10
            ) / 10,
          val = value[1];

        if (index == 1) {
          waveVoc.append(time, val);
        } else if (index == 2) {
          waveJsc.append(time, val);
        }
      });
    });

    return {
      waveVoc: waveVoc,
      waveJsc: waveJsc
    };
  });
};

export const getJVData = (db, measurementName, props) => {
  let timefrom;
  measurementName = encodeURIComponent(measurementName);

  return influxquery(
    `SELECT time,iv,sun FROM "${measurementName}_iv" ORDER BY time ASC;`,
    db,
    db.db
  ).then(async results => {
    return results.map((results, index) => {
      if (!results.series) {
        // No data
        return {};
      }

      if (index == 0) {
        // Get the reference time
        timefrom = new Date(results.series[0].values[0][0]);
      }

      return results.series[0].values.map(value => {
        let date = new Date(value[0]),
          data = value[1].split(","),
          wave = Graph.newWaveform();

        for (let i = 0; i < data.length - 1; i += 2) {
          wave.append(
            parseFloat(data[i].replace('"', "")),
            parseFloat(data[i + 1].replace('"', ""))
          );
        }

        return {
          wave: wave,
          time_h:
            Math.round(
              ((date.getTime() - timefrom.getTime()) / 1000 / 3600) * 10
            ) / 10,
          sun: value[2]
        };
      });
    });
  });
};
