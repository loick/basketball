import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'

const axes = [
  {
    name: 'Player Impact',
    domain: 25,
  },
  {
    name: 'Points',
    domain: 25,
  },
  {
    name: 'Rebounds',
    domain: 12,
  },
  {
    name: 'Assists',
    domain: 12,
  },
  {
    name: 'Steals',
    domain: 4,
  },
  {
    name: 'Blocks',
    domain: 4,
  },
]

export default class SpiderChart extends Component
{
  static propTypes = {
    datas: React.PropTypes.array.isRequired,
    width: React.PropTypes.string.isRequired,
    mainColor: React.PropTypes.string.isRequired,
    bgColor: React.PropTypes.string.isRequired,
    axesColor: React.PropTypes.string.isRequired,
    transition: React.PropTypes.integer,
    padding: React.PropTypes.integer,
    circles: React.PropTypes.integer,
  }

  static defaultProps = {
    transition: 2000,
    padding: 60,
    circles: 5,
  }

  state = {
    radius: 0,
  }

  componentDidMount() {
    this.updateChart()
  }

  componentWillReceiveProps() {
    this.updateChart()
  }

  hexToRgba(hex, opacity = 1) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const hexFormated = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexFormated)
    const rgba = [result[1], result[2], result[3]]

    return result ? `rgba(${rgba.map((el) => parseInt(el, 16)).join(',')},${opacity})` : null
  }

  slice(number) {
    return Math.PI * 2 * number / axes.length
  }

  rScale(maxDomain, value) {
    const f = d3.scale.linear()
      .domain([0, maxDomain])
      .range([0, this.state.radius])

    return value !== undefined ? f(value) : f
  }

  drawArea(value) {
    const f = d3.svg.line.radial()
      .angle((d, i) => this.slice(i))
      .radius((d, i) => this.rScale(this.formatDomain(axes[i].domain, d), d))
      .interpolate('cardinal-closed')

    return f(value)
  }

  formatDomain(currentDomain, maxDomain) {
    const domain = Math.max(currentDomain, maxDomain)
    return domain > 0 ? domain : 0
  }

  position(currentDomain, axis, index, padding = 1) {
    const position = Math[axis === 'x' ? 'cos' : 'sin'](this.slice(index) - Math.PI * 0.5)
    const domain = this.formatDomain(axes[index].domain, currentDomain) * padding

    return this.rScale(domain, currentDomain) * position
  }

  initialize(el) {
    const svg = el.selectAll('svg').data([this.props.datas])
    const init = svg.enter().append('svg').append('g')

    const axisWrap = init.append('g').attr('class', 'radar-axis')
    axisWrap
      .selectAll('.radar-axis-level')
      .data(d3.range(0, parseInt(this.props.circles, 10) + 1).reverse())
      .enter()
        .append('circle')
        .attr('class', 'radar-axis-level')
        .style('fill', this.hexToRgba(this.props.bgColor, 0.15))

    const axisLines = axisWrap.selectAll('.radar-axis-lines')
      .data(axes)
      .enter()
        .append('g')
        .style('stroke', this.hexToRgba(this.props.axesColor))
        .attr('class', 'radar-axis-lines')

    axisLines.append('line')
      .attr('class', 'radar-axis-line')
      .attr('x1', 0)
      .attr('y1', 0)

    axisLines.append('text')
      .style('fill', this.hexToRgba(this.props.axesColor))
      .attr('class', 'radar-axis-label')
      .text((d, i) => axes[i].name)

    init.selectAll('.radar-area')
      .data([this.props.datas])
      .enter()
        .append('path')
        .attr('class', 'radar-area')
        .attr('d', (d) => this.drawArea(d))

    init.selectAll('.radar-point')
      .data(this.props.datas)
      .enter()
        .append('circle')
        .attr('class', 'radar-point')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 5)

    svg
      .attr('width', this.props.width)
      .attr('height', this.props.width)

    const translate = this.props.padding + this.state.radius
    const g = svg.select('g')
      .attr('transform', `translate(${translate}, ${translate})`)

    return g
  }

  radar(el) {
    const g = this.initialize(el)

    // Circles
    g.selectAll('.radar-axis-level')
      .attr('r', (d) => this.state.radius / parseInt(this.props.circles, 10) * d)

    // Mesures
    g.selectAll('.radar-axis-line')
      .attr('x2', (d, i) => this.position(d.domain, 'x', i, 0.98))
      .attr('y2', (d, i) => this.position(d.domain, 'y', i, 0.98))

    // Labels
    g.selectAll('.radar-axis-label')
      .attr('x', (d, i) => this.position(d.domain, 'x', i, 0.85))
      .attr('y', (d, i) => this.position(d.domain, 'y', i, 0.9))
      .attr('text-anchor', (d, i) => {
        const x = this.position(d.domain, 'x', i, 0.85)
        switch (x) {
          case x > 1:
            return 'start'
          case x < -1:
            return 'end'
          default:
            return 'middle'
        }
      })

    // Drawn area
    g.select('.radar-area')
      .style('fill', this.hexToRgba(this.props.mainColor, 0.6))
      .transition()
        .duration(this.props.transition)
        .ease('cubic-out')
        .attr('d', (d) => this.drawArea(d))

    // Dots
    g.selectAll('.radar-point')
      .style('fill', this.hexToRgba(this.props.mainColor, 0.8))
      .data((d) => d)
      .on('mouseover', (d) => {
        d3.select('#tooltip')
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY}px`)
          .style('opacity', 1)
          .select('#value')
          .text(d)
      })
      .on('mouseout', () => {
        d3.select('#tooltip')
          .style('opacity', 0)
      })
      .transition()
        .duration(this.props.transition)
        .ease('cubic-out')
        .attr('cx', (d, i) => this.position(d, 'x', i))
        .attr('cy', (d, i) => this.position(d, 'y', i))
  }

  updateChart() {
    this.setState({
      radius: (this.props.width - 2 * this.props.padding) * 0.5,
    }, () => {
      const chart = d3
        .select(ReactDOM.findDOMNode(this))
        .datum(this.props.datas)

      this.radar(chart)
    })
  }

  render() {
    return (
      <div className="radarChart">
        <div id="tooltip" className="hidden">
          <p>
            Current value :
            <span id="value"></span>
          </p>
        </div>
      </div>
    )
  }
}
