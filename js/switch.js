import React, { Component } from 'react'

export default class Switch extends Component
{
  static propTypes = {
    data: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  }

 	static defaultProps = {
  	data: [{label: 'on', value: 'on'}, {label: 'off', value: 'off'}],
  	selectedIndex: 0,
  	onChange: () => {},
  	className: '',
	}

	state = {
  	selectedIndex: 0,
  	cursorStyle: {},
  	value: null,
	}

	componentWillMount() {
  	this.setState({selectedIndex: this.props.selectedIndex, value: this.props.data[this.props.selectedIndex].value})
	}

	componentDidMount() {
  	this.select(this.state.selectedIndex)
	}

	select(index) {
  	this.setState({
    		selectedIndex: index,
    		cursorStyle: this.getCursorStyle(index),
    		value: this.props.data[index].value,
    		off: this.props.data[index].off
  	});

  	this.props.onChange(this.props.data[index].value)
	}

	handleClick() {
  	this.select(this.state.selectedIndex === 1 ? 0 : 1)
	}

	getCursorStyle(index) {
  	index = index === 1 ? 0 : 1
  	let selected = React.findDOMNode(this.refs[`choice-${index}`])

  	return {left: selected.offsetLeft, width: selected.offsetWidth}
	}

	render() {
  	let data0 = this.props.data[0]
  	let data1 = this.props.data[1]
  	let className = `${this.props.className} ${this.state.off ? 'toggle-off' : ''}`

  	return (
  		<div style={ this.props.style }>
      		<div className={`toggle ${className}`} onClick={::this.handleClick}>
        		<span ref="choice-0" className="toggle__choice">{data0.label}</span>
        		<span ref="choice-1" className="toggle__choice">{data1.label}</span>
        		<div className="toggle__slider" style={this.state.cursorStyle}/>
        		<input ref="input" type="hidden" name={this.props.name} defaultValue={this.props.data[this.props.selectedIndex].value} value={this.state.value}/>
      		</div>
  		</div>
  	)
  }
}