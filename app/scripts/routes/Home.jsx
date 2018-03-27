import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import config from 'config';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Graph from 'react-graph-vis';
import Icon from 'material-ui/Icon';

import ReactResizeDetector from 'react-resize-detector';

import { drawerStatusChange, getEdges, getNodes } from 'actions';

// let nodes = require('../../../nodes.json');
// let edges = require('../../../edges.json');

export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      selectedNode: {
        id: 0,
        label: '',
        tags: '',
        type: '',
        image: '',
        description: '',
      },
      selectedEdge: {
        from: '',
        to: '',
        type: '',
        description: '',
        reference: '',
      },
      showdetail: false,
      showNodeInfo: true,
      options: {
        autoResize: true,
        nodes: {
          shape: 'dot',
          borderWidth: 4,
          size: 30,
          color: {
            border: '#222222',
            background: '#b3b3b3',
          },
          font: {
            // color: '#eeeeee',
          },
          widthConstraint: {
            minimum: 50,
            maximum: 100,
          },
        },
        edges: {
          color: 'lightgray',
          length: 200,
          widthConstraint: {
            maximum: 500,
          },
        },
      },
      
      // options: {
      //   autoResize: true,
      //   layout: {
      //     hierarchical: false,
      //   },
      //   physics: {
      //     adaptiveTimestep: false,
      //   },
      //   edges: {
      //     smooth: {
      //       type: 'cubicBezier',
      //       forceDirection: 'none',
      //       roundness: 0.5,
      //     },
      //   },
      //   nodes: {
      //     shape: 'dot',
      //     size: 30,
      //     color: {
      //       border: '#222222',
      //       background: '#b3b3b3',
      //     },
      //   },
      //   interaction: {
      //     hover: true,
      //   },
      //   manipulation: {
      //     enabled: true,
      //   },
      // },
    });
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
  };

  /**
   * Add event listener
   */
  componentDidMount() {
    const { dispatch } = this.props;
    if( window.innerWidth <= 1000 )
      dispatch(drawerStatusChange(false));
    dispatch(getEdges());
    dispatch(getNodes());
    this.updateDimensions();
    window.network = this;
  }

  componentWillReceiveProps(nextProps) {
    //window.addEventListener('resize', this.updateDimensions());
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    const network = this._network;
    if( network ) {
      network.setSize(window.innerWidth, window.innerHeight);
      network.redraw();
    }
    const { dispatch } = this.props;
    // if(window.innerWidth<=1000)
    //   dispatch(drawerStatusChange(false));
  }
  
  events = {
    select: function(event) {
      const { nodes, edges } = event;
      console.log(event);
      console.log(nodes);
      console.log(edges);
      if(nodes.length>0)
        window.network.showDetailPanel(nodes[0], 0);
      else{
        window.network.showDetailPanel(edges[0], 1);
      }
    }
  }

  showDetailPanel(id, type) {
    const { dispatch } = this.props;
    dispatch(drawerStatusChange(true));
    const { app } = this.props;
    const nodes = app.nodes.data;
    const edges = app.edges.data;
    if( type === 0 ) {
      for (const node of nodes) {
        if (node.id === id) {
          this.setState({ showdetail: true });
          this.setState({ selectedNode: node });
          this.setState({ showNodeInfo: true });
        }
      }
    } else {
      for (const edge of edges) {
        if (edge.id === id) {
          this.setState({ showdetail: true });
          this.setState({ selectedEdge: edge });
          this.setState({ showNodeInfo: false });
        }
      }
    }
  }

  getNetwork(network) {
    this._network = network;
  }

  animateFit() {
    const network = this._network;
    
    let options = { offset: { x: 0, y: 0 },
      duration: 1000,
      easingFunction: 'linear',
    };
    network.fit({ animation: options });
  }

  scaleIn() {
    let network = this._network;
    let scale = network.getScale();
    let options = {
      position: { x: 0, y: 0 },
      scale: scale * 1.5,
      offset: { x: 0, y: 0 },
      animation: true,
    };
    network.moveTo(options);
  }

  scaleOut() {
    const { dispatch } = this.props;
    dispatch(getEdges());
    let network = this._network;
    let scale = network.getScale();
    let options = {
      position: { x: 0, y: 0 },
      scale: scale / 1.5,
      offset: { x: 0, y: 0 },
      animation: true,
    };
    network.moveTo(options);
  }

  render() {
    const { app } = this.props;
    const node = this.state.selectedNode;
    const edge = this.state.selectedEdge;
    
    let graph = {
      nodes: app.nodes.data,
      edges: app.edges.data,
    };
    return (
      <div>
        <Drawer
          type="persistent"
          open={app.draweropened}
          className="left-drawer"
        >
          { 
            (this.state.showdetail) ?
              (
                (this.state.showNodeInfo) ? 
                  (<div>
                    <div className="detail">
                      <div className="info">
                        <div className="name"><h2>{node.label}</h2></div>
                        <div className="tag">{node.tags}</div>
                      </div>
                      <div className="photo">
                        <img src={node.image} width='100' height='100'/>
                      </div>
                      <Icon color="action" onClick={() => this.setState({ showdetail: false })} className="close-icon">close</Icon>
                    </div>
                    <div className="description">
                      {node.description}
                    </div>
                  </div>)
                  :
                  (
                    <div>
                      <div className="detail">
                      <div className="info">
                        <div className="name"><h2>{edge.type}</h2></div>
                      </div>
                      <Icon color="action" onClick={() => this.setState({ showdetail: false })} className="close-icon">close</Icon>
                    </div>
                    <div className="description">
                      {edge.description}
                    </div>
                    </div>
                  )
              )
              :
              (
                <div>
                  <h2>The PayPal Mafia: How Selling to eBay Spawned the Creation of Tech's Next Generation of Companies</h2>
                  <p />
                  <p />
                  <p>
                    The "PayPal Mafia" refers to a group of former PayPal employees/founders that went on to launch more successful companies in a shorter time period than almost any other group in history.
                  </p>
                  <p>
                    eBay acquired PayPal in 2002 for $1.5 B. Flush with cash and a big vision, many of PayPal's key employees left and started companies of their own, often founding companies together and investing in each other's efforts.
                  </p>
                </div>
              )
          }
        </Drawer>
        <div className="right-panel">
          <div className="zoom-control">
            <div className="tooltip">
              <Icon color="action" onClick={() => this.scaleIn()}>zoom_in</Icon>
              <span className="tooltiptext">Zoom In</span>
            </div>
            <div className="tooltip">
              <Icon color="action" onClick={() => this.scaleOut()}>zoom_out</Icon>
              <span className="tooltiptext">Zoom Out</span>
            </div>
            <div className="tooltip">
              <Icon color="action" onClick={() => this.animateFit()}>fullscreen_exit</Icon>
              <span className="tooltiptext">Zoom Fit</span>
            </div>
          </div>
          <Graph graph={graph} options={this.state.options} events={this.events} style={{ height: "100vh" }} getNetwork={(network)=>this.getNetwork(network)} />
        </div>
        {/* <ReactResizeDetector handleWidth handleHeight onResize={this.updateDimensions()} /> */}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { app: state.app };
}

export default connect(mapStateToProps)(Home);
