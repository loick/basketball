import React, { Component } from 'react'

import Player from './player'

const delayBase = 50
const delayInc = 70
const defaultZ = -200

export default class Ground extends Component
{
  static propTypes = {
    display: React.PropTypes.number,
    team: React.PropTypes.array.isRequired,
  }

  state = {
    rotation: 0,
    team: [],
    currentPlayerFocus: null,
    worldModifier: {
      transform: {
        x: 0,
        y: 0,
        z: -90,
      },
    },
  }

  componentDidMount() {
    this.setState({ team: this.props.team })
    setTimeout(::this.animatePlayers, 1000)

    setTimeout(() => {
      this.setState({
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
  }

  componentWillReceiveProps(props) {
    // Change team
    if (this.props.display !== props.display) {
      // TODO : PROMISES
      this.animatePlayers(0)

      setTimeout(() =>

        // Change players
        // Rotate the ground
        this.setState(
          {
            team: props.team,
            rotation: (props.display === 0) ? 0 : 180,
          }, () =>
            setTimeout(() => {
              // Display players
              this.animatePlayers(1)
            }, 500)
          )

      , 500)
    }
  }

  onPlayerClick(id, playerX = 0, playerZ = 0, y = 0) {
    const worldModifier = this.state.worldModifier

    const currentPlayerFocus = this.state.currentPlayerFocus === id ? null : id

    const x = (currentPlayerFocus === null) ? 0 : playerX
    const z = (currentPlayerFocus === null) ? defaultZ : playerZ

    worldModifier.transform = { x, y, z }

    this.setState({ currentPlayerFocus, worldModifier })
  }

  animatePlayers(drop = 1) {
    for (const playerId in this.state.team) {
      if ({}.hasOwnProperty.call(this.state.team, playerId)) {
        this.updatePlayerStyle(playerId, drop)
      }
    }
  }

  updatePlayerStyle(playerId, drop) {
    const delay = delayBase + playerId * delayInc
    const team = this.state.team

    setTimeout(() => {
      team[playerId].style = { opacity: drop ? 1 : 0 }
      team[playerId].animateZ = drop ? 40 : 0

      this.setState({ team })
    }, delay)
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
    const styleWorld = this.state.worldModifier
    styleWorld.transform = `translateX(${styleWorld.transform.x}px) translateY(${styleWorld.transform.y}px) translateZ(${styleWorld.transform.z}px)`

    const styleTerrain = {}
    styleTerrain.transform = `rotateY(${this.state.rotation}deg)`

    return (
      <div className="stage">
        <div className="world" style={ styleWorld }>
          <div className="team">
            {
              this.state.team.map((datas, index) =>
                <Player
                  {...datas}
                  key={index}
                  id={index}
                  onClick={::this.onPlayerClick}
                  current={this.state.currentPlayerFocus === index}
                />
              )
            }
          </div>
          <div className="court" style={ styleTerrain }>
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
