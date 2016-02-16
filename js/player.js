import React from 'react';

export default class Player extends React.Component
{
	position()
	{
		let coords = {};
		switch(this.props.pos)
		{
			case 1 :
				coords.x = 100;
				coords.y = 170;
				break;
			case 2 :
				coords.x = 180;
				coords.y = 365;
				break;
			case 3 :
				coords.x = -150;
				coords.y = 200;
				break;
			case 4 :
				coords.x = -115;
				coords.y = 370;
				break;
			case 5 :
				coords.x = 10;
				coords.y = 340;
				break;
			default :
				coords.x = 0;
				coords.y = 0;
		}

		if(this.props.animateX){ coords.x += this.props.animateX }
		if(this.props.animateY){ coords.y += this.props.animateY }

		return coords;
	}

	onClick()
	{
		let {x,y} = this.position();
		this.props.onClick(this.props.id, -x, - Math.ceil((y - 200 )/2));
	}

	renderCard()
	{
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

	render()
	{
		let class_name = ['player'];
		if(this.props.current)
		{
			class_name.push('active');
		}

		let {x,y} = this.position();

		let style = this.props.style || {};
		style.transform = 'translateX(' + x + 'px) translateY(0px) translateZ(' + y + 'px)';

		return(
			<div className={class_name.join(' ')} style={style} onClick={::this.onClick}>
				{ this.props.current && this.renderCard() }
				<div className="player__img">
					<img src={"images/players/" + this.props.asset}/>
				</div>
				<div className="player__label">
					<span>{ this.props.name }</span>
				</div>
			</div>
		);
	}
}