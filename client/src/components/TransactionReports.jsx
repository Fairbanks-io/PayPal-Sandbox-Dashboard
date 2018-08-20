import React from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  input: {
    display: 'none',
  },
});

class TransactionReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipnData: null,
      ipnCount: null
    };
    this.getIpnData = this.getIpnData.bind(this);
    this.getIpnCount = this.getIpnCount.bind(this);
  }

  getIpnData() {
    fetch(`/api/ipnData`)
    .then(response => {
        return response.json()
      }).then(data => {
        if(data){
          this.setState({ ipnData: data });
        } else {
          this.setState({ ipnData: "Error Getting IPN Data" });
        }
      })
  }

  getIpnCount() {
    fetch(`/api/ipnCount`)
    .then(response => {
        return response.json()
      }).then(data => {
        if(data){
          this.setState({ ipnCount: data });
        } else {
          this.setState({ ipnCount: "Error Getting IPN Count" });
        }
      })
  }

  componentDidMount() {
    this.getIpnData();
    this.getIpnCount();
  }

  render() {
    const { classes } = this.props;
    var ipnData = this.state.ipnData;
    var ipnCount = this.state.ipnCount;
    return (
      <TabContainer>
        <div>
          <h4>Transaction Reports</h4>
          {ipnCount
            ? <div>
                <h6>IPN Count:</h6>
                <pre>{ipnCount}</pre>
              </div>
            : null
          }
          {ipnData
            ? <div>
              <h6>IPN Data:</h6>
              <pre>{JSON.stringify(ipnData)}</pre>
              {ipnData.map(function(ipn, i) {
                <div>
                  <span>{i}</span>
                  <pre>{JSON.stringify(ipn)}</pre>
                </div>
              })}
            </div>
            : null
          }
        </div>
      </TabContainer>
    );
  }
}
TransactionReports.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionReports);