import React from 'react';
import JV from '../../util/jv';
import PropTypes from 'prop-types';

const findJV = (measurementStack, jvIndex, chanId) => {
  return measurementStack.filter(
    meas => meas.jvId == index && meas.chanId == chanId
  )[0];
};

const formatNumber = number => {
  return number.toPrecision(3);
};

class JVChannelTable extends React.PureComponent {
  render() {
    const {
      jvs,
      jvElements,
      jvToDisplay,
      chanId,
      cellArea,
      sunIntensity
    } = this.props;
    console.log(jvs);
    return (
      <div>
        <h4>Channel {chanId}</h4>
        <table className="table table-condensed table-bordered table-striped">
          <thead>
            <tr>
              <th>Start (V)</th>
              <th>End (V)</th>
              <th>Scan rate (V/s)</th>
              <th>
                V<sub>oc</sub> (V)
              </th>
              <th>
                J<sub>sc</sub> (mA)
              </th>
              <th>FF (%)</th>
              <th>PCE (%)</th>
              <th>
                R<sub>p</sub>
              </th>
              <th>
                R<sub>s</sub>
              </th>
            </tr>
          </thead>
          <tbody>
            {jvElements.map((jvElement, index) => {
              // Let's not display any j-v section that's not selected
              let jv = findJV(jvs, index, chanId);
              let tds = [];

              if (jv) {
                let voc, jsc, pce;

                try {
                  voc = formatNumber(jv.jv.getVoc()) + ' V';
                } catch (error) {
                  voc = (
                    <span className="text-danger" title={error}>
                      N/A
                    </span>
                  );
                }

                try {
                  try {
                    jsc = (
                      <span className="">
                        {formatNumber(jv.jv.getJsc())}
                        mA cm
                        <sup>-2</sup>
                      </span>
                    );
                  } catch (error) {
                    throw new Error(
                      'Crossing at 0V could not be found. Make sure that the j-V curve boundaries include a 0V crossing (stopping at 0V is not enough).'
                    );
                  }

                  if (!cellArea) {
                    throw new Error(
                      'Area is not defined. Cannot normalize the current'
                    );
                  }

                  jsc /= cellArea;
                } catch (error) {
                  jsc = (
                    <span className="text-danger" title={error}>
                      N/A
                    </span>
                  );
                }

                try {
                  if (!cellArea) {
                    throw new Error(
                      'Area is not defined. Cannot normalize the power output'
                    );
                  }

                  if (!sunIntensity) {
                    throw new Error(
                      'Sun intensity is not defined. Cannot calculate the PCE'
                    );
                  }

                  try {
                    pce = (
                      <span className="">
                        {formatNumber(
                          Math.round(
                            1000 * jv.jv.getPCE(cellArea, sunIntensity / 1000)
                          ) / 10
                        )}
                        %
                      </span>
                    );
                  } catch (error) {
                    throw new Error(
                      'Could not find the maximum power point. Make sure that there is a local maximum in the power - voltage curve'
                    );
                  }
                } catch (error) {
                  pce = (
                    <span className="text-danger" title={error}>
                      N/A
                    </span>
                  );
                }

                tds = [
                  <td key="voc">{voc}</td>,
                  <td key="jsc">{jsc}</td>,
                  <td key="ff">
                    <span cassName="label label-primary">{jv.jv.getFF()}</span>
                  </td>,
                  <td key="pce">{pce}</td>
                ];
              } else {
                tds = [
                  <td key="voc" />,
                  <td key="jsc" />,
                  <td key="ff" />,
                  <td key="pce" />
                ];
              }

              return (
                <tr key={index + '_' + jvElement.chanId}>
                  <td>{jvElement.start} V</td>
                  <td>{jvElement.end} V</td>
                  <td>{jvElement.scanRate} V / s </td>
                  {tds}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

JVChannelTable.propTypes = {
  jvs: PropTypes.arrayOf(
    PropTypes.shape({ jv: PropTypes.instanceOf(JV).isRequired })
  ).isRequired,
  jvToDisplay: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  chanId: PropTypes.number.isRequired,
  cellArea: PropTypes.number.isRequired,
  sunIntensity: PropTypes.number.isRequired
};

export default JVChannelTable;
