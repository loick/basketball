import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Ground from './ground'
import Switch from './switch'
import Loader from './loader'
import SpiderChart from './spiderchart'

import datas from './datas_players.js'

import '../css/app.css'

class Stage extends Component
{
  state = {
    players :
    {
      starters : [],
      bench    : [],
    },
    switchState : 0,
    isLoaded    : false,
    spiderChart : [0, 0, 0, 0, 0, 0],
  }

  componentDidMount() {
    // AJAX API CALL for the players instead of the import.
    setTimeout(() => {
      this.setState({
        isLoaded : true,
        players  : {
          starters : datas.splice(0, 5),
          bench    : datas,
        },
      })
    }, 2000)

    setInterval(::this.testSpiderChart, 2000)
  }

  onChange(switchState) {
    this.setState({ switchState })
  }

  // Will move to player, testing mode here.
  testSpiderChart() {
    const spiderChart = [
      Math.floor(5 * Math.random() + 1),
      Math.floor(5 * Math.random() + 1),
      Math.floor(5 * Math.random() + 1),
      Math.floor(5 * Math.random() + 1),
      Math.floor(5 * Math.random() + 1),
      Math.floor(5 * Math.random() + 1),
    ]

    this.setState({ spiderChart })
  }

  render() {
    const team = (this.state.switchState === 0) ? 'starters' : 'bench'
    const switchData = [
      {
        label : 'Starting 5',
        value : 0,
      },
      {
        label : 'Bench',
        value : 1,
        off   : true,
      },
    ]

    return (
      <section>
        <Loader loaded={this.state.isLoaded}>
          <header>
            <h1>Basketball</h1>
            <Switch
              onChange={::this.onChange}
              name="rotate"
              data={switchData}
              selectedIndex={this.state.current_display}
            />
          </header>
         <Ground display={this.state.switchState} team={ this.state.players[team] } />
        </Loader>
        { /*
          <SpiderChart
            axesColor="#404040"
            bgColor="#FFF"
            mainColor="#FB0217"
            width="500"
            datas={this.state.spiderChart}
          />
        */ }
      </section>
    )
  }
}

ReactDOM.render(<Stage />, document.getElementById('react-render'))
