import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { uptime } from 'os';

class Diagnostics extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hosts: {}
    };

    setInterval(() => {
      this.getDiagnostics();
    }, 5000);

    ipcRenderer.on('diagnostic-ping', (event, result) => {
      this.state.hosts[result.instrument.trackerHost] =
        this.state.hosts[result.instrument.trackerHost] || {};

      this.state.hosts[result.instrument.trackerHost].ping = result.error
        ? false
        : true;
      this.setState({ hosts: this.state.hosts });
    });

    ipcRenderer.on('diagnostic-boardList', (event, result) => {
      this.state.hosts[result.instrument.trackerHost] =
        this.state.hosts[result.instrument.trackerHost] || {};
      this.state.hosts[result.instrument.trackerHost].boards = result.error
        ? false
        : result.result;
      this.setState({ hosts: this.state.hosts });
    });

    ipcRenderer.on('diagnostic-status', (event, result) => {
      this.state.hosts[result.instrument.trackerHost] =
        this.state.hosts[result.instrument.trackerHost] || {};
      this.state.hosts[result.instrument.trackerHost].status = result.error
        ? false
        : result.result;
      this.setState({ hosts: this.state.hosts });
    });

    ipcRenderer.on('diagnostic-restart', (event, result) => {
      setTimeout(() => {
        this.getDiagnostics();
      }, 2000);
    });

    ipcRenderer.on('diagnostic-stop', (event, result) => {
      setTimeout(() => {
        this.getDiagnostics();
      }, 2000);
    });

    this.downloadErrorLog = this.downloadErrorLog.bind(this);
    this.downloadLog = this.downloadLog.bind(this);
    this.restart = this.restart.bind(this);
    this.start = this.start.bind(this);
  }

  downloadErrorLog(instrument) {
    ipcRenderer.send('diagnostic-errorlog', instrument);
  }

  downloadLog(instrument) {
    ipcRenderer.send('diagnostic-log', instrument);
  }

  restart(instrument) {
    ipcRenderer.send('diagnostic-restart', instrument);
  }

  start() {
    ipcRenderer.send('diagnostic-start', instrument);
  }

  componentDidMount() {
    this.getDiagnostics();
  }

  componentWillReceiveProps(nextProps) {
    this.getDiagnostics();
  }

  getDiagnostics() {
    this.props.config.instruments.forEach(instrument => {
      ipcRenderer.send('diagnostic-ping', instrument);
      ipcRenderer.send('diagnostic-boardList', instrument);
      ipcRenderer.send('diagnostic-status', instrument);
    });
  }

  render() {
    // ( connected ? 'ok text-success' : 'warning-sign text-danger' )
    // bg-success
    // bg-error

    if (!this.props.config) {
      return <div className="alert alert-danger">No configuration</div>;
    }

    const trackers = this.props.config.instruments.map(instrument => {
      if (!this.state.hosts[instrument.trackerHost]) {
        return <div />;
      }

      let txtPing, alertPing, txtBoards, alertBoards, txtStatus, alertStatus;

      if (this.state.hosts[instrument.trackerHost].ping) {
        txtPing = <span className="glyphicon glyphicon-ok text-success" />;
        alertPing = 'alert alert-success';
      } else {
        txtPing = <span className="glyphicon glyphicon-remove text-danger" />;
        alertPing = 'alert alert-danger';
      }

      const st = this.state.hosts[instrument.trackerHost].status;
      const restartBtn = (
        <button
          onClick={() => {
            this.restart(instrument);
          }}
          className="btn btn-default btn-xs">
          <span className="glyphicon glyphicon-refresh" />
          &nbsp; Restart
        </button>
      );

      const startBtn = (
        <button
          onClick={() => {
            this.restart(instrument);
          }}
          className="btn btn-default btn-xs">
          <span className="glyphicon glyphicon-play" />
          &nbsp; Start
        </button>
      );

      if (this.state.hosts[instrument.trackerHost].status) {
        if (
          this.state.hosts[instrument.trackerHost].status.pm2_env.status ==
          'online'
        ) {
          const upTime = new Date(st.pm2_env.pm_uptime);
          txtStatus = (
            <div>
              <div className="pull-right">{restartBtn}</div>
              <span className="glyphicon glyphicon-ok text-success" />
              &nbsp; Process running (#{st.pid}, CPU:{' '}
              <strong>{st.monit.cpu}%</strong>, Memory:{' '}
              <strong>{Math.round(st.monit.memory / 1024 / 1024)} Mo</strong>).
              <br />
              Running since: <strong>{upTime.toString()}</strong>
              <br />
              Autorestart:{' '}
              <strong>{st.pm2_env.autorestart ? 'Yes' : 'No'}</strong>
              <br />
              Number of restarts: <strong>{st.pm2_env.restart_time}</strong>
              <br />
            </div>
          );
          alertStatus = 'alert alert-success';
        } else {
          txtStatus = (
            <div>
              <span className="glyphicon glyphicon-remove text-danger" />
              &nbsp; Process status: <strong>{st.pm2_env.status}</strong>{' '}
              <div className="pull-right">{restartBtn}</div>
            </div>
          );

          alertStatus = 'alert alert-danger';
        }
      } else {
        txtStatus = (
          <div>
            <span className="glyphicon glyphicon-remove text-danger" />
            &nbsp; Process could not be found{' '}
            <div class="pull-right">{startBtn}</div>
          </div>
        );
        alertStatus = 'alert alert-danger';
      }

      if (this.state.hosts[instrument.trackerHost].boards) {
        let allOk = true;
        txtBoards = this.state.hosts[instrument.trackerHost].boards.map(
          board => {
            const boardInfo = (
              <span>
                Component: <strong>{board.alias}</strong> <br />
                <small>
                  Path: <em>{board.host}</em>
                </small>
              </span>
            );

            if (board.responsive)
              return (
                <div className="text-success">
                  <span className="glyphicon glyphicon-ok" />
                  &nbsp;
                  <strong>(USB resource available)</strong> {boardInfo}
                </div>
              );

            allOk = false;
            return (
              <div className="text-danger">
                <span className="glyphicon glyphicon-remove" />
                &nbsp;
                <strong>(USB resource non-available)</strong> {boardInfo}
              </div>
            );
          }
        );

        if (!allOk) {
          alertBoards = 'alert alert-danger';
        } else {
          alertBoards = 'alert alert-success';
        }
      } else {
        txtBoards = (
          <div className="text-danger">Could not retrieve board list</div>
        );
      }

      return (
        <div>
          <div className="pull-right">
            <button
              className="btn btn-xs btn-default"
              onClick={() => {
                this.downloadLog(instrument);
              }}>
              <span class="glyphicon glyphicon-download" />
              &nbsp; Download logs
            </button>
            &nbsp;
            <button
              className="btn btn-xs btn-default"
              onClick={() => {
                this.downloadErrorLog(instrument);
              }}>
              <span class="glyphicon glyphicon-download" />
              &nbsp; Download error logs
            </button>
          </div>

          <h4>
            {instrument.trackerName}
            <small>&nbsp;({instrument.trackerHost})</small>
          </h4>

                    <div className={alertPing}>
              {txtPing}&nbsp;Network access to the machine
            </div>

            <div className={alertStatus}>{txtStatus}</div>
            <div className={alertBoards}>{txtBoards}</div>
        </div>
      );
    });
    return (
      <div>
        <h3>Diagnostics</h3>
        {trackers}
      </div>
    );
  }
}

ipcRenderer.send('get-config');
ipcRenderer.on('get-config', (evt, config) => {
  ReactDOM.render(
    <Diagnostics config={config} />,
    document.getElementById('root')
  );
});
