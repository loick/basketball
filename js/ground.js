import React from 'react';

import Player from './player';

const delay_base = 50;
const delay_inc = 70;

const defaultZ = -200;

export default class Ground extends React.Component
{
    static propTypes =
    {
        display: React.PropTypes.number,
        team: React.PropTypes.array.isRequired
    }

    state =
    {
        rotation : 0,
        team: [],
        current_player_focus : null,
        world_modifier: {
            transform : {
                x : 0,
                y : 0,
                z : -90
            }
        }
    }

    componentDidMount()
    {
        this.setState({'team' : this.props.team});
        setTimeout(::this.animatePlayers, 1000);

        setTimeout(() => {
            this.setState({'world_modifier' : {
                opacity   :  1,
                transform : {
                    x : 0,
                    y : 0,
                    z : defaultZ
                }
            }});
        },400);
    }

    componentWillReceiveProps(props)
    {
        // Change team
        if(this.props.display !== props.display)
        {
            // Remove Current Players
            this.animatePlayers(0);

            setTimeout(() => {

                // Change players
                // Rotate the ground
                this.setState(
                {
                    'team'     : props.team,
                    'rotation' : (props.display === 0) ? 0 : 180
                },() => {

                    setTimeout(() => {
                        // Display players
                        this.animatePlayers(1);
                    },500)
                });
            },500)

        }
    }

    animatePlayers(drop = 1)
    {
        for (let player_id in this.state.team)
        {
            this.updatePlayerStyle(player_id, drop);
        }
    }

    updatePlayerStyle(player_id, drop)
    {
        let delay = delay_base + player_id * delay_inc;
        let team = this.state.team;

        setTimeout(() => {
            team[player_id].style ={ opacity: drop ? 1 : 0 };
            team[player_id].animateY = drop ? 40 : 0;

            this.setState({'team' : team});

        },delay);
    }

    onPlayerClick(id, x= 0, z = 0, y = 0)
    {
        let world_modifier = this.state.world_modifier;

        let focus = this.state.current_player_focus === id ? null : id;
        x = (focus === null) ? 0 : x;
        z = (focus === null) ? defaultZ : z;

        world_modifier.transform = { x, y, z };

        this.setState(
        {
            'current_player_focus' : focus,
            'world_modifier' : world_modifier
        });
    }

    renderTeamGround(reverse = '')
    {
        return (
            <div className={`team_ground ${reverse}`}>
                <div className="three_point_line">
                    <div className="arc field__line"></div>
                    <div className="lines"></div>
                </div>

                <div className="raquette">
                    <div className="first_line"></div>
                    <div className="second_line"></div>
                    <div className="free_throw"></div>
                    <div className="top_free_throw"></div>
                </div>
            </div>
        )
    }

    render()
    {
        let style_world = this.state.world_modifier;
        style_world.transform = `translateX(${style_world.transform.x}px) translateY(${style_world.transform.y}px) translateZ(${style_world.transform.z}px)`;

        let style_terrain = {};
        style_terrain.transform = `rotateY(${this.state.rotation}deg)`;

        return(
            <div className="stage">
                <div className="world" style={ style_world }>
                    <div className="team">
                        {
                            this.state.team.map( (datas, index) =>
                                <Player
                                    {...datas}
                                    id={index}
                                    onClick={::this.onPlayerClick}
                                    current={this.state.current_player_focus === index}
                                />
                            )
                        }
                    </div>
                    <div className="terrain" style={ style_terrain }>

                        <div className="field ground">

                            <div className="field__line field__line--outline"></div>

                            <div className="field__line field__line--circle"></div>

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
        );
    }
}