import React, { Component } from 'react';

import Ground from './ground';
import Switch from './switch';
import Loader from './loader';
import SpiderChart from './spiderchart';

import datas from './datas_players.js';

import '../css/app.css';

class Stage extends Component
{
    state =
    {
        players :
        {
            starters : [],
            bench : []
        },
        current_display : 0,
        isLoaded : false,
        test : [0,0,0,0,0,0]
    }

    onChange(display)
    {
        this.setState({ 'current_display' : display })
    }

    componentDidMount()
    {
        // PROMISE API CALL for the players instead of the import.
        setTimeout(() => {
            this.setState(
            {
                players : {
                    'starters' : datas.splice(0,5),
                    'bench' : datas
                },
                isLoaded : true
            });
        }, 2000 );

        setInterval(::this.testSpiderChart,2000);
    }

    testSpiderChart() {
        let test =
        [
            Math.floor(5 * Math.random() + 1),
            Math.floor(5 * Math.random() + 1),
            Math.floor(5 * Math.random() + 1),
            Math.floor(5 * Math.random() + 1),
            Math.floor(5 * Math.random() + 1),
            Math.floor(5 * Math.random() + 1)
        ];
        this.setState({ 'test' : test });
    }

    render()
    {
        let team = (this.state.current_display === 0) ? this.state.players.starters : this.state.players.bench;
        return(
            <section>

                <Loader title="Chargement" loaded={this.state.isLoaded}>
                    <header>
                        <h1>Basketball</h1>
                        <Switch onChange={::this.onChange} name="rotate" data={[{label: '5 majeur', value: 0}, {label: 'Banc', value: 1, off: true}]} selectedIndex={this.state.current_display} />
                    </header>
                   <Ground display={this.state.current_display} team={team} />
                </Loader>
                { /*
                <SpiderChart axesColor="#404040" bgColor="#FFF" mainColor="#FB0217" width="500" datas={this.state.test} />
                */ }
            </section>
        );
    }
}

React.render(<Stage />, document.getElementById('react-render'));
