import React, { Component } from 'react'

export default class Switch extends Component
{
  static propTypes = {
    data          : React.PropTypes.array,
    selectedIndex : React.PropTypes.number,
    onChange      : React.PropTypes.func,
    className     : React.PropTypes.string,
  }

 	static defaultProps = {
    onChange      : () => {},
    selectedIndex : 0,
    className     : '',
	}

	state = {
    datas : [
      {
        label: 'on',
        value: 'on',
      },
      {
        label: 'off',
        value: 'off',
      }
    ],
  	selectedIndex : 0,
  	cursorStyle   : {},
  	value         : null,
	}

	componentWillMount() {
    let datas = this.props.data.splice(0,2);
  	this.setState({
      datas         : datas,
      selectedIndex : this.props.selectedIndex,
      value         : datas[this.props.selectedIndex].value,
    })
	}

	componentDidMount() {
  	this.select(this.state.selectedIndex)
	}

	select(index) {
  	this.setState({
    		selectedIndex : index,
    		cursorStyle   : this.getCursorStyle(index),
    		value         : this.state.datas[index].value,
    		off           : this.state.datas[index].off,
  	});

  	this.props.onChange(this.state.datas[index].value)
	}

	handleClick() {
  	this.select(this.state.selectedIndex === 1 ? 0 : 1)
	}

	getCursorStyle(index) {
  	index = (index === 1) ? 0 : 1
  	let selected = React.findDOMNode(this.refs[`choice-${index}`])

  	return {
      left  : selected.offsetLeft,
      width : selected.offsetWidth,
    }
	}

	render() {
  	let className = `${this.props.className} ${this.state.off ? 'toggle-off' : ''}`

  	return (
  		<div style={ this.props.style }>
      		<div className={`toggle ${className}`} onClick={::this.handleClick}>
            {
              this.state.datas.map( (data, i) => <span ref={`choice-${i}`} className="toggle__choice">{data.label}</span>)
            }
        		<div className="toggle__slider" style={this.state.cursorStyle}/>
        		<input
              type="hidden"
              name={this.props.name}
              defaultValue={this.state.datas[this.props.selectedIndex].value}
              value={this.state.value}
            />
      		</div>
  		</div>
  	)
  }
}