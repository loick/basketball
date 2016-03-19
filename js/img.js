import React, { Component } from 'react'

const placeholder = '/placeholder.jpg'

export default class Img extends Component
{
  static propTypes = {
    src: React.PropTypes.string,
    title: React.PropTypes.string,
  }

  static defaultProps = {
    src: placeholder,
  }

  state = {
    src: '',
  }

  componentDidMount() {
    const img = new Image()
    img.onload = ::this.onLoaded
    img.onerror = ::this.onError
    img.src = `images/players/${this.props.src}`
  }

  onError() {
    this.setState({ src: placeholder })
  }

  onLoaded() {
    this.setState({ src: `images/players/${this.props.src}` })
  }

  render() {
    return (
      <img
        alt={this.props.title}
        title={this.props.title}
        src={this.state.src}
      />
    )
  }
}
