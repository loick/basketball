import React, { Component } from 'react'

export default class Player extends Component
{
	componentDidMount() {
        document.addEventListener('click', ::this.handleDocumentClick)
    }

    handleDocumentClick(event) {

    	if (this.props.current && !this.refs.player.getDOMNode().contains(event.target))
			this.onClick()
    }

	position() {
		let coords = {}
		switch(this.props.pos)
		{
			case 1 :
				coords.x = 100
				coords.z = 170
				break
			case 2 :
				coords.x = 180
				coords.z = 365
				break
			case 3 :
				coords.x = -150
				coords.z = 200
				break
			case 4 :
				coords.x = -115
				coords.z = 370
				break
			case 5 :
				coords.x = 10
				coords.z = 340
				break
			default :
				coords.x = 0
				coords.z = 0
		}

		if(this.props.animateY)
		{
			coords.z += this.props.animateY
		}

		return coords
	}

	onClick() {
		let {x,z} = this.position()
		this.props.onClick(this.props.id, -x-10, - z)
	}

	renderCard() {
		return(
			<div className="player__card">
				<h3>{ this.props.name }</h3>
				<ul className="player__card__list">
					<li>
						<span>Age</span>
						<br/>{ this.props.age }
					</li>
					<li>
						<span>Taille</span>
						<br/>{ this.props.height }
					</li>
					<li>
						<span>Origin</span>
						<br/>{ this.props.origin }
					</li>
				</ul>
				<ul className="player__card__list player__card__list--last">
					<li>
						<span>Matchs LNB</span>
						<br/>{ this.props.lnb }
					</li>
					<li>
						<span>Europe games</span>
						<br/>21
					</li>
				</ul>
			</div>
		)
	}

	render() {
		let class_name = ['player']

		if(this.props.current)
			class_name.push('active')

		let {x,z} = this.position()

		let style = this.props.style || {}
		style.transform = `translateX(${x}px) translateY(0px) translateZ(${z}px)`

		return(
			<div
				ref='player'
				className={class_name.join(' ')}
				style={style}
				onClick={!this.props.current && ::this.onClick}
			>
				{ this.props.current && this.renderCard() }
				<div className="player__img">
					<img src={"images/players/" + this.props.asset}/>
				</div>
				<div className="player__label">
					<span>{ this.props.name }</span>
				</div>
			</div>
		)
	}
}