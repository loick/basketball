import React, { Component } from 'react'

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
    spiderChart : [0,0,0,0,0,0],
  }

  onChange(switchState) {
    this.setState({ switchState })
  }

  componentDidMount() {
    // AJAX API CALL for the players instead of the import.
    setTimeout(() => {
      this.setState({
        players : {
          'starters' : datas.splice(0,5),
          'bench' : datas,
        },
        isLoaded : true
      })
    },2000)

    setInterval(::this.testSpiderChart,2000)
  }

  // Will move to player, testing mode here.
  testSpiderChart() {
    let spiderChart = [
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
    let team = (this.state.switchState === 0) ? this.state.players.starters : this.state.players.bench
    let switch_data = [
      {
        label : 'Starting 5',
        value : 0
      },
      {
        label : 'Bench',
        value : 1,
        off   : true
      }
    ]
    return(
      <section>
        <Loader loaded={this.state.isLoaded}>
          <header>
            <h1>Basketball</h1>
            <Switch onChange={::this.onChange} name="rotate" data={switch_data} selectedIndex={this.state.current_display} />
          </header>
         <Ground display={this.state.switchState} team={team} />
        </Loader>
        { /*
        <SpiderChart axesColor="#404040" bgColor="#FFF" mainColor="#FB0217" width="500" datas={this.state.test} />
        */ }
      </section>
    )
  }
}

React.render(<Stage />, document.getElementById('react-render'))
