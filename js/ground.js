import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Player from './player'

const defaultZ = -200

export default class Ground extends Component
{
  static propTypes = {
    display: React.PropTypes.number,
    team: React.PropTypes.array.isRequired,
  }

  state = {
    team: [],
    drop: true,
    rotation: 0,
    currentPlayerFocus: null,
    worldModifier: {
      opacity: 0,
      transform: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        team: this.props.team,
        worldModifier: {
          opacity: 1,
          transform: {
            x: 0,
            y: 0,
            z: defaultZ,
          },
        },
      })
    }, 400)

    ReactDOM
      .findDOMNode(this.refs.court)
      .addEventListener('transitionend', ::this.onCourtTransitionEnd, false)
  }

  componentWillReceiveProps(props) {
    // Change team
    if (this.props.display !== props.display) {
      // Should unfocus player first
      this.setState({ drop: false })
    }
  }

  onCourtTransitionEnd() {
    this.setState({ drop: true })
  }

  onPlayersRemoved() {
    this.setState({
      rotation: (this.props.display === 0) ? 0 : 180,
      team: this.props.team,
    })
  }

  onPlayerClick(id, playerX = 0, playerZ = 0, y = 0) {
    const currentPlayerFocus = this.state.currentPlayerFocus === id ? null : id

    const x = (currentPlayerFocus === null) ? 0 : playerX
    const z = (currentPlayerFocus === null) ? defaultZ : playerZ

    const worldModifier = {}
    worldModifier.transform = { x, y, z }
    worldModifier.opacity = this.state.worldModifier.opacity

    this.setState({ currentPlayerFocus, worldModifier })
  }

  getWorldStyle() {
    const styleWorld = {}

    styleWorld.opacity = this.state.worldModifier.opacity

    styleWorld.transform = Object.keys(this.state.worldModifier.transform).reduce((prev, axis) =>
      `${prev} translate${axis.toUpperCase()}(${this.state.worldModifier.transform[axis]}px)`
    , '');

    return styleWorld
  }

  renderTeamGround(reverse = '') {
    return (
      <div className={`team_ground ${reverse}`}>
        <div className="three_point_line">
          <div className="arc"></div>
          <div className="lines"></div>
        </div>

        <div className="paint">
          <div className="first_line"></div>
          <div className="second_line"></div>
          <div className="free_throw"></div>
          <div className="top_free_throw"></div>
        </div>
      </div>
    )
  }

  render() {
    const styleTerrain = {}
    styleTerrain.transform = `rotateY(${this.state.rotation}deg)`

    return (
      <div className="stage">
        <div className="world" style={ this.getWorldStyle() }>
          <div className="team">
            {
              this.state.team.map((datas, index) =>
                <Player
                  {...datas}
                  key={index}
                  id={index}
                  nbPlayers={this.state.team.length}
                  drop={this.state.drop}
                  onClick={::this.onPlayerClick}
                  onPlayerHidden={::this.onPlayersRemoved}
                  current={this.state.currentPlayerFocus === index}
                />
              )
            }
          </div>
          <div ref="court" className="court" style={ styleTerrain }>
            <div className="field">
              <div className="field__line--outline"></div>
              <div className="field__line--circle"></div>
              { this.renderTeamGround() }
              { this.renderTeamGround('reverse') }
            </div>
            <div className="field__side field__side--front"></div>
            <div className="field__side field__side--left"></div>
            <div className="field__side field__side--right"></div>
            <div className="field__side field__side--back"></div>
          </div>
        </div>
      </div>
    )
  }
}
